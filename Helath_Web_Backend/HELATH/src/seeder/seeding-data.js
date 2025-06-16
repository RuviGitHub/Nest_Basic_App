// blog categories
export const blogCategoryData = [
    { category: "All", isActive: true },
    { category: "Health", isActive: true },
    { category: "Beauty", isActive: true },
    { category: "Food", isActive: true },
    { category: "Exercise", isActive: true }
];

// roles
export const roleData = [
    { role: "Super Admin" },
    { category: "Admin" },
    { category: "Patient" },
    { category: "Service Provider 1" },
    { category: "Service Provider 2" },
    { category: "Service Provider 3" },
    { category: "Service Provider 4" },
];

// super admin
export const superAdminData = [
    {
        email: "admin@example.com",
        first_name: "John",
        last_name: "Doe",
        gender: 1, // Male
        date_of_birth: new Date("1985-05-15"),

        phone_number: "714146019",
        country_code: "+94",
        dial_code: "+94",

        role_id: 1,

        is_email_verified: true,
        is_phone_number_verified: true,
        is_account_verified: true,
        is_profile_completed: true,

        latest_password: "hashedpassword123",
        last_password: "oldhashedpassword456",
        latest_password_created_at: new Date("2025-01-01T10:00:00Z"),

        latest_otp: "123456",
        latest_otp_reference: "OTPREF12345",
        latest_otp_created_at: new Date("2025-06-01T12:00:00Z"),

        sign_up_via: 1, // app

        apple_id: "",
        google_id: "",
        push_id: "push-id-123456",
        token: "token-abcdef123456",
        device_id: "device-id-123456",
        ip_address: "192.168.0.1",

        last_login_at: new Date("2025-06-15T08:30:00Z"),

        theme_color: 0, // system

        is_active: true,
    }
];