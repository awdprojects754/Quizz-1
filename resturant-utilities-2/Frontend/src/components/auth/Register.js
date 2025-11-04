import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    restaurantName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.restaurantName.trim())
      tempErrors.restaurantName = "Restaurant name is required.";
    if (!formData.email.trim())
      tempErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Invalid email format.";
    if (!formData.password)
      tempErrors.password = "Password is required.";
    else if (formData.password.length < 6)
      tempErrors.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match.";
    if (!formData.phone.trim())
      tempErrors.phone = "Phone number is required.";
    if (!formData.address.trim())
      tempErrors.address = "Address is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await register(formData);
    } catch (err) {
      alert("Registration failed.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Create your restaurant account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input name="restaurantName" placeholder="Restaurant Name" value={formData.restaurantName} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
          {errors.restaurantName && <p className="text-red-500">{errors.restaurantName}</p>}

          <input name="email" type="email" placeholder="Email address" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          <input name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}

          <input name="address" type="text" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
          {errors.address && <p className="text-red-500">{errors.address}</p>}

          <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
          {errors.password && <p className="text-red-500">{errors.password}</p>}

          <input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" />
          {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <div className="text-center">
            <Link to="/login" className="text-primary-600 hover:text-primary-500">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
