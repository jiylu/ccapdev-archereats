import { useState } from "react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { cn } from "../../lib/utils";
import { checkLoginExists, resetPassword } from "../../api/auth.api";

interface ForgotPasswordModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onBackToLogin: () => void;
}

export default function ForgotPasswordModal({
    open,
    onOpenChange,
    onBackToLogin,
}: ForgotPasswordModalProps) {
    const [login, setLogin] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const [loading, setLoading] = useState(false);
    const [identifierError, setIdentifierError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const resetState = () => {
        setLogin("");
        setNewPassword("");
        setConfirmPassword("");
        setShowPasswordFields(false);
        setLoading(false);
        setIdentifierError("");
        setPasswordError("");
        setSuccessMessage("");
    };

    const handleClose = (value: boolean) => {
        if (!value) resetState();
        onOpenChange(value);
    };

    const handleBack = () => {
        resetState();
        onOpenChange(false);
        onBackToLogin();
    };

    const handleContinue = async () => {
        setIdentifierError("");
        setPasswordError("");
        setSuccessMessage("");

        if (!login.trim()) {
            setIdentifierError("Enter your username or email.");
            return;
        }

        try {
            setLoading(true);

            const { exists } = await checkLoginExists(login);

            if (!exists) {
                setIdentifierError("Username or Email does not exist.");
                return;
            }

            setShowPasswordFields(true);
        } catch (err) {
            console.error(err);
            setIdentifierError("Failed to verify username or email.");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        setPasswordError("");
        setIdentifierError("");
        setSuccessMessage("");

        if (!login.trim()) {
            setIdentifierError("Enter your username or email.");
            return;
        }

        if (!newPassword.trim() || !confirmPassword.trim()) {
            setPasswordError("Fill in both password fields.");
            return;
        }

        if (newPassword.length < 6) {
            setPasswordError("Password must be at least 6 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            await resetPassword({
                login,
                password: newPassword,
            });

            setSuccessMessage("Password updated successfully.");

            resetState();
            onOpenChange(false);
            onBackToLogin();
        } catch (err: any) {
            console.error(err);

            const message =
                err?.response?.data?.message || "Failed to reset password.";

            if (
                message.toLowerCase().includes("user not found") ||
                message.toLowerCase().includes("cannot reset")
            ) {
                setIdentifierError("Username or Email does not exist.");
            } else {
                setPasswordError(message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-black">
                        Forgot Password
                    </DialogTitle>
                </DialogHeader>

                <div className="w-full">
                    <FieldGroup className="justify-self-start">
                        <Field>
                            <FieldLabel>Username or Email</FieldLabel>
                            <Input
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                placeholder="Enter username or email"
                                className={cn(
                                    identifierError &&
                                        "border-red-500 focus-visible:ring-red-500"
                                )}
                            />
                        </Field>

                        {showPasswordFields && (
                            <>
                                <Field>
                                    <FieldLabel>New Password</FieldLabel>
                                    <Input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Enter new password"
                                        className={cn(
                                            passwordError &&
                                                "border-red-500 focus-visible:ring-red-500"
                                        )}
                                    />
                                </Field>

                                <Field>
                                    <FieldLabel>Confirm New Password</FieldLabel>
                                    <Input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm new password"
                                        className={cn(
                                            passwordError &&
                                                "border-red-500 focus-visible:ring-red-500"
                                        )}
                                    />
                                </Field>
                            </>
                        )}
                    </FieldGroup>

                    {identifierError && (
                        <p className="text-sm text-red-500 mt-2 text-center">
                            {identifierError}
                        </p>
                    )}

                    {passwordError && (
                        <p className="text-sm text-red-500 mt-2 text-center">
                            {passwordError}
                        </p>
                    )}

                    {successMessage && (
                        <p className="text-sm text-green-600 mt-2 text-center">
                            {successMessage}
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-2 w-full mt-2">
                    {!showPasswordFields ? (
                        <Button
                            type="button"
                            onClick={handleContinue}
                            disabled={loading}
                            className="w-full bg-[#1E4D36] text-white hover:bg-[#006937] hover:text-white"
                        >
                            {loading ? "Checking..." : "Continue"}
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            onClick={handleResetPassword}
                            disabled={loading}
                            className="w-full bg-[#1E4D36] text-white hover:bg-[#006937] hover:text-white"
                        >
                            {loading ? "Updating..." : "Reset Password"}
                        </Button>
                    )}

                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleBack}
                        className="w-full"
                    >
                        Back
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}