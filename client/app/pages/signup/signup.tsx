import SignupForm from "../../components/auth/signup-form";
import Navbar from "../../components/layout/navbar";

export default function Signup () {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
                <div className="flex flex-col items-center mt-10 mb-10 gap-0.5">
                        <h2 className="scroll-m-20 pb-2 text-3xl font-bold tracking-tight first:mt-0">
                            Create your Account
                        </h2>
                        <span className="text-base">Join the ArcherEats community of foodies around Taft and start sharing your experiences!</span>

                </div>

                <div className="flex justify-center">
                    <SignupForm />
                </div>

        </div>
    )
}