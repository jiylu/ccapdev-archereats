import Navbar from "../components/layout/navbar";
import Footer from "../components/layout/footer";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useEffect, useRef ,useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { checkUsernameAvailability, updateUser } from "../api/user.api";
import { cn } from "../lib/utils";
import { toast } from "sonner";
import PageLoader from "../components/ui/loading";
import { Loader2 } from "lucide-react";

export default function EditProfile () {
    const { user, setAuth, token } = useAuth();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement | null>(null)

    const [formData, setFormData] = useState({
        username: "",
        firstName: "",
        lastName: "",
        isStudent: false,
        biography: "",
    })

    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [checkingUsername, setCheckingUsername] = useState(false);
    const [usernameChecked, setUsernameChecked] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [saveChangesLoading, setSaveChangesLoading] = useState(false);


    useEffect(() => {
        document.title="Edit Profile | ArcherEats";

        if(user) {
            setFormData({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                biography: user.biography || "",
                isStudent: user.isStudent,
            })

            setAvatarPreview(user.avatar || "/default-avatar.svg");
        }

        setPageLoading(false);
    }, [user])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const target = e.target as HTMLInputElement;
        const { name, value, type } = target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? target.checked : value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));

        if (name === "username") {
            setUsernameChecked(false);
        }
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setAvatarFile(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.username.trim()) {
            newErrors.username = "Username is required.";
        }

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required.";
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleCheckUsername = async () => {
        const username = formData.username.trim();

        if (!username) {
            setErrors((prev) => ({
                ...prev,
                username: "Username is required."
            }));
            return;
        }

        if (user && username === user.username) {
            setErrors((prev) => ({
                ...prev,
                username: ""
            }));
            setUsernameChecked(true);
            toast.success("This is already your current username.");
            return;
        }

        try {
            setCheckingUsername(true);

            const result = await checkUsernameAvailability(username);

            if (result.isAvailable) {
                setErrors((prev) => ({
                    ...prev,
                    username: ""
                }));
                setUsernameChecked(true);
                toast.success("Username is available!");
            } else {
                setErrors((prev) => ({
                    ...prev,
                    username: "Username is already taken."
                }));
                setUsernameChecked(false);
                toast.error("Username is already taken.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to check username.");
        } finally {
            setCheckingUsername(false);
        }
    };

    const handleSave = async () => {
        if (!user) return;

        if (!validateForm()) {
            toast.error("Please fill in the required fields.");
            return;
        }

        try {
            setSaveChangesLoading(true)
            const payload = new FormData();
            payload.append("username", formData.username);
            payload.append("firstName", formData.firstName);
            payload.append("lastName", formData.lastName);
            payload.append("biography", formData.biography);
            payload.append("isStudent", String(formData.isStudent));

            if (avatarFile) {
                payload.append("avatar", avatarFile);
            }

            const updatedUser = await updateUser(user._id, payload);

            setAuth(token, updatedUser);

            toast.success("Profile updated successfully!");
            navigate(`/profile/${user?.username}`);

        } catch (err: any) {
            console.error(err);

            const message =
                err?.response?.data?.message || "Failed to update profile.";

            toast.error(message);
        } finally {
            setSaveChangesLoading(false)
        }
    };

    if(!user) return null;
    if (pageLoading) return <PageLoader />

    return (
        <>
            <div className="min-h-screen bg-[#fffcf5]">
                <Navbar />
                <div className="flex justify-start mt-12 ml-48">
                    
                    {/* Profile Picture Section dito */}
                    <div className="flex flex-col items-center">
                        <img src={avatarPreview || "/default-avatar.svg"}
                        alt = "Profile Picture"
                        className = "w-[210px] h-[210px] rounded-full object-cover border border-gray-300 mb-4"/>
                        
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                        
                        <Button
                            variant="outline"
                            className="text-[#123524] border-[#123524]/30 hover:bg-[#123524]/5"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            Change Avatar
                        </Button>
                    </div>

                    {/* Edit Profile Section dito */}
                    <div className="ml-16 mt-2 flex flex-col text-[#123524] max-w-[700px]">
                        <h1 className="text-2xl font-extrabold leading-tight">Edit Profile</h1>

                        <p className="text-base mt-1 mb-5 leading-relaxed">
                            Manage your account's information and make sure it's true to keep
                            the reviews more reliable to students, workers, and other users.
                        </p>

                        {/* username */}
                        <h2 className="text-xl font-bold mt-2">Username*</h2>
                        <p className="text-base mt-1">Customize and check your username availability</p>

                        <div className="flex mt-2">
                            <div className="w-[85%]">
                                <Input
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className={cn(
                                        "rounded-xl bg-white",
                                        errors.username && "border-red-500 focus-visible:ring-red-500",
                                        usernameChecked && !errors.username && "border-green-500 focus-visible:ring-green-500"
                                    )}
                                />
                                {errors.username && (
                                    <p className="text-sm text-red-500 mt-1">{errors.username}</p>
                                )}
                                {!errors.username && usernameChecked && (
                                    <p className="text-sm text-green-600 mt-1">Username is available.</p>
                                )}
                            </div>

                            <Button
                                type="button"
                                onClick={handleCheckUsername}
                                disabled={checkingUsername}
                                className="ml-3 bg-[#00b25d] hover:bg-[#0e2a1d] text-white rounded-xl px-6"
                            >
                                {checkingUsername ? "Checking..." : "Check"}
                            </Button>
                        </div>

                        {/* full name */}
                        <div className="flex gap-[36%] mt-6">
                            <h2 className="text-xl font-bold">First Name*</h2>
                            <h2 className="text-xl font-bold">Last Name*</h2>
                        </div>

                        <div className="flex gap-4 mt-2">
                            <div className="w-1/2">
                                <Input
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={cn(
                                        "rounded-xl bg-white",
                                        errors.firstName && "border-red-500 focus-visible:ring-red-500"
                                    )}
                                />
                                {errors.firstName && (
                                    <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
                                )}
                            </div>

                            <div className="w-1/2">
                                <Input
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={cn(
                                        "rounded-xl bg-white",
                                        errors.lastName && "border-red-500 focus-visible:ring-red-500"
                                    )}
                                />
                                {errors.lastName && (
                                    <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
                                )}
                            </div>
                        </div>

                        {/* Student Status */}
                        <h2 className="text-xl font-bold mt-6">Student Status</h2>

                        <label className="flex items-center gap-2 mt-2">
                            <input
                                type="checkbox"
                                name="isStudent"
                                checked={formData.isStudent}
                                onChange={handleChange}
                            />
                            I am a student
                        </label>

                        {/* bio */}
                        <h2 className="text-xl font-bold mt-6">Biography</h2>
                        <p className="text-base mt-1">Write a short description about yourself.</p>
                        <Textarea
                            name="biography"
                            value={formData.biography}
                            onChange={handleChange}
                            className="mt-2 rounded-xl resize-none h-24 bg-white"
                        />

                        {/* save changes button */}
                            <div className="flex gap-3 mt-8 pb-10">
                            <Button
                                onClick={handleSave}
                                className="bg-[#22754d] hover:bg-[#32a970] text-white rounded-xl px-6"
                            >
                                {saveChangesLoading ? (
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                    "Save Changes"
                                )}
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => navigate(`/profile/${user?.username}`)}
                                className="text-[#123524] border-[#123524]/30 hover:bg-gray-100"
                                disabled={saveChangesLoading}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}