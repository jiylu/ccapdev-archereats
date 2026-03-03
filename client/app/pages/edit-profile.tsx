import Navbar from "../components/layout/navbar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Link } from "react-router-dom";

export default function EditProfile () {
    return (
        <>
            <div className="min-h-screen bg-[#fffcf5]">
                <Navbar />
                <div className="flex justify-start mt-12 ml-48">
                    
                    {/* Profile Picture Section dito */}
                    <div className="flex flex-col items-center">
                        <img src="/default-avatar.svg"
                        alt = "Profile Picture"
                        className = "w-[210px] h-[210px] rounded-full object-cover border border-gray-300 mb-4"/>
                        <Button variant="outline" className="text-[#123524] border-[#123524]/30 hover:bg-[#123524]/5">
                            Change Avatar</Button>
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
                            <Input placeholder="juandelacruz" className="w-[85%] rounded-xl bg-white"/>
                            <Button className="ml-3 bg-[#00b25d] hover:bg-[#0e2a1d] text-white rounded-xl px-6">Check</Button>
                        </div>

                        {/* full name */}
                        <div className="flex gap-[36%] mt-6">
                            <h2 className="text-xl font-bold">First Name*</h2>
                            <h2 className="text-xl font-bold">Last Name*</h2>
                        </div>

                        <div className="flex gap-4 mt-2">
                            <Input placeholder="Juan" className="w-1/2 rounded-xl bg-white"/>
                            <Input placeholder="Dela Cruz" className="w-1/2 rounded-xl bg-white"/>
                        </div>

                        {/* status */}
                        <h2 className="text-xl font-bold mt-6">Status</h2>
                        <p className="text-base mt-1">What is your current status? (Worker, Professor, Student, etc.)</p>
                        <Input placeholder="Student" className="rounded-xl mt-2 bg-white"/>

                        {/* bio */}
                        <h2 className="text-xl font-bold mt-6">Biography</h2>
                        <p className="text-base mt-1">Write a short description about yourself.</p>
                        <Textarea placeholder="I love food!" className="mt-2 rounded-xl resize-none h-24 bg-white"/>

                        {/* save changes button */}
                        <div className="flex gap-3 mt-8 pb-10">
                            <Button asChild className="bg-[#22754d] hover:bg-[#32a970] text-white rounded-xl px-6">
                                <Link to="/profile">Save Changes</Link>
                            </Button>
                            <Button asChild variant="outline" className="text-[#123524] border-[#123524]/30 hover:bg-gray-100 rounded-lg px-5">
                                <Link to="/profile">Cancel</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}