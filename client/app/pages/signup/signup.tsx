import SignupForm from "../../components/auth/signup-form";
import Navbar from "../../components/layout/navbar";
import { useEffect } from "react";

export default function Signup () {

    useEffect(() => {
        document.title="Sign-Up | ArcherEats";
    }, [])
    
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
                <div className="flex flex-col items-center mt-10 mb-7 gap-0.5">
                        <h2 className="scroll-m-20 pb-2 text-3xl font-bold tracking-tight first:mt-0">
                            Create your Account
                        </h2>
                        <span className="text-base font-light">Join ArcherEats, the community of foodies and restaurant owners  around Taft and start sharing your experiences!</span>

                </div>

                <div className="flex justify-center">
                    <SignupForm />
                </div>

        </div>
    )
}