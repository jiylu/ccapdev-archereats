import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogFooter } from "../ui/dialog";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

export function LoginModal () {
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <span className="cursor-pointer text-white">Log In</span>
                </DialogTrigger>

                <DialogContent className="flex items-center flex-col">
                    <DialogHeader>
                        <DialogTitle className="flex">
                            <span className="text-2xl font-bold text-black">Welcome Back!</span>
                        </DialogTitle>
                    </DialogHeader>
                    
                    <FieldGroup className="justify-self-start">
                        <Field>
                            <FieldLabel>Username</FieldLabel>
                            <Input 
                                id="username"
                                placeholder="Enter username" 
                                required 
                            />
                        </Field>
                        <Field>
                            <FieldLabel>Password</FieldLabel>
                            <Input 
                                id="username"
                                placeholder="Enter password" 
                                required 
                                type="password"
                            />
                        </Field>
                    </FieldGroup>
                    
                    <DialogFooter className="flex flex-col!">
                        <span className="text-[0.75em]">Forgot Password?</span>
                        <DialogClose asChild>
                            <Button variant="outline" className="w-115 bg-[#1E4D36] text-white  hover:bg-[#006937] hover:text-white  transition-colors duration-200">Continue</Button>
                        </DialogClose>
                        <span className="flex items-center justify-center text-xs">
                            Don't have an account?
                            <DialogClose asChild>
                                <Link to="/signup" className="ml-1 underline font-semibold">Sign In</Link>
                            </DialogClose>
                        </span>
                    </DialogFooter>
                </DialogContent>   
            </form>             
        </Dialog>
    );
} 