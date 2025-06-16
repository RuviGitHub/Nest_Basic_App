const userSchema = new Schema(
    {
        email: { type: String, maxlength: 100, trim: true, index: true },
        first_name: { type: String, maxlength: 255, trim: true },
        last_name: { type: String, maxlength: 255, trim: true },
        gender: { type: Number, enum: [0, 1, 2], default: 0 },
        date_of_birth: { type: Date },

        phone_number: { type: String, maxlength: 20, trim: true },
        country_code: { type: String, maxlength: 4, trim: true },
        dial_code: { type: String, maxlength: 4, trim: true },

        role_id: { type: Number, default: 1 },

        is_email_verified: { type: Boolean, default: false },
        is_phone_number_verified: { type: Boolean, default: false },
        is_account_verified: { type: Boolean, default: false },
        is_profile_completed: { type: Boolean, default: false },

        latest_password: { type: String, maxlength: 255 },
        last_password: { type: String, maxlength: 255 },
        latest_password_created_at: { type: Date },

        latest_otp: { type: String, maxlength: 6 },
        latest_otp_reference: { type: String, maxlength: 15 },
        latest_otp_created_at: { type: Date },

        sign_up_via: { type: Number, default: 1 },

        apple_id: { type: String, maxlength: 255 },
        google_id: { type: String, maxlength: 255 },
        push_id: { type: String, maxlength: 255 },
        token: { type: String, maxlength: 255 },
        device_id: { type: String, maxlength: 255 },
        ip_address: { type: String, maxlength: 45 },

        last_login_at: { type: Date },

        theme_color: { type: Number, enum: [0, 1, 2], default: 0 },

        is_active: { type: Boolean, default: true },
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);
