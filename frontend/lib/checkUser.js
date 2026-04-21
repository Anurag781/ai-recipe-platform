import { auth, currentUser } from "@clerk/nextjs/server";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return {
      id: null,
      subscriptionTier: "free",
    };
  }

  if (!STRAPI_API_TOKEN) {
    console.error("❌ STRAPI_API_TOKEN missing");
    return null;
  }

  const { has } = await auth();
  const subscriptionTier = has({ plan: "pro" }) ? "pro" : "free";

  try {
    console.log("🔍 Checking user in Strapi for Clerk ID:", user.id);

    // ==================================================
    // STEP 1: FIND USER BY CLERK ID
    // ==================================================
    let existingUserResponse = await fetch(
      `${STRAPI_URL}/api/users?filters[clerkid][$eq]=${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
        cache: "no-store",
      }
    );

    if (!existingUserResponse.ok) {
      const errorText = await existingUserResponse.text();
      console.error("❌ Strapi clerkid lookup failed:", errorText);
      return null;
    }

    let existingUserData = await existingUserResponse.json();

    // ==================================================
    // STEP 2: FOUND BY CLERK ID
    // ==================================================
    if (existingUserData.length > 0) {
      const existingUser = existingUserData[0];

      console.log("✅ Found existing user:", existingUser.id);

      // update plan if changed
      if (existingUser.subscriptionTier !== subscriptionTier) {
        await fetch(`${STRAPI_URL}/api/users/${existingUser.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${STRAPI_API_TOKEN}`,
          },
          body: JSON.stringify({
            subscriptionTier,
          }),
        });
      }

      return {
        ...existingUser,
        subscriptionTier,
      };
    }

    // ==================================================
    // STEP 3: FIND USER BY EMAIL (MIGRATION FIX)
    // ==================================================
    const email = user.emailAddresses[0].emailAddress;

    console.log("🔍 No clerkid match. Checking email:", email);

    const emailResponse = await fetch(
      `${STRAPI_URL}/api/users?filters[email][$eq]=${email}`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
        cache: "no-store",
      }
    );

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error("❌ Email lookup failed:", errorText);
      return null;
    }

    const emailUserData = await emailResponse.json();

    // ==================================================
    // STEP 4: FOUND OLD USER BY EMAIL → LINK CLERK ID
    // ==================================================
    if (emailUserData.length > 0) {
      const existingEmailUser = emailUserData[0];

      console.log(
        "🔄 Found old user by email. Linking Clerk ID:",
        existingEmailUser.id
      );

      const updateResponse = await fetch(
        `${STRAPI_URL}/api/users/${existingEmailUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${STRAPI_API_TOKEN}`,
          },
          body: JSON.stringify({
            clerkid: user.id,
            subscriptionTier,
          }),
        }
      );

      if (!updateResponse.ok) {
        const errorText = await updateResponse.text();
        console.error("❌ Failed linking Clerk ID:", errorText);
        return null;
      }

      return {
        ...existingEmailUser,
        clerkid: user.id,
        subscriptionTier,
      };
    }

    // ==================================================
    // STEP 5: GET AUTH ROLE
    // ==================================================
    const rolesResponse = await fetch(
      `${STRAPI_URL}/api/users-permissions/roles`,
      {
        headers: {
          Authorization: `Bearer ${STRAPI_API_TOKEN}`,
        },
      }
    );

    if (!rolesResponse.ok) {
      const errorText = await rolesResponse.text();
      console.error("❌ Failed loading roles:", errorText);
      return null;
    }

    const rolesData = await rolesResponse.json();

    const authenticatedRole = rolesData.roles.find(
      (role) => role.type === "authenticated"
    );

    if (!authenticatedRole) {
      console.error("❌ Authenticated role not found");
      return null;
    }

    // ==================================================
    // STEP 6: CREATE NEW USER
    // ==================================================
    const userData = {
      username:
        user.username ||
        `${email.split("@")[0]}_${user.id.slice(-6)}`,

      email,

      password: `clerk_managed_${user.id}_${Date.now()}`,

      confirmed: true,
      blocked: false,

      role: authenticatedRole.id,

      clerkid: user.id,

      firstName: user.firstName || "",
      lastName: user.lastName || "",
      imageUrl: user.imageUrl || "",

      subscriptionTier,
    };

    console.log("🆕 Creating new Strapi user...");

    const newUserResponse = await fetch(`${STRAPI_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify(userData),
    });

    if (!newUserResponse.ok) {
      const errorText = await newUserResponse.text();
      console.error("❌ Error creating user:", errorText);
      return null;
    }

    const newUser = await newUserResponse.json();

    console.log("✅ Created new user:", newUser.id);

    return newUser;
  } catch (error) {
    console.error("❌ Error in checkUser:", error.message);
    return null;
  }
};