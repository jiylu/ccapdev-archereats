
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";

export default function SignupForm () {
    const [isStudent, setIsStudent] = useState(false);
    
    return (

        <Card className="w-full max-w-150">
            <CardContent>
                <form>
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-2">
                            <div className="flex flex-col gap-2 flex-1">
                                <Label htmlFor="firstname">First Name</Label>
                                <Input
                                    id="firstname"
                                    type="text"
                                    placeholder="Juan"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2 w-55">
                                <Label htmlFor="firstname">Last Name</Label>
                                <Input
                                    id="lastname"
                                    type="text"
                                    placeholder="Dela Cruz"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 flex-1">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                    id="username"
                                    type="text"
                                    placeholder="juandelacruz"
                                    required
                            />
                        </div>

                        <div className="flex flex-col gap-2 flex-1">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                    id="email"
                                    type="email"
                                    placeholder="juandelacruz@sampleemail.com"
                                    required
                            />
                        </div>

                        
                        <div className="flex flex-col gap-2 flex-1">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    required
                            />
                        </div>

                        <div className="flex flex-col gap-2 flex-1">
                            <Label htmlFor="confirmpassword">Confirm Password</Label>
                            <Input
                                    id="confirmpassword"
                                    type="password"
                                    placeholder="Confirm your password"
                                    required
                            />
                        </div>

                        <Separator />
                        <Card>
                            <CardHeader>
                                <CardTitle>Are you a student around Taft?</CardTitle>
                                <CardAction>
                                    <Switch 
                                        checked={isStudent}
                                        onCheckedChange={setIsStudent}
                                    />
                                </CardAction>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-2 w-50">
                                <Label htmlFor="idnumber">ID Number (First 3 Digits)</Label>
                                <Input
                                    id="idnumber"
                                    type="text"
                                    placeholder="123"
                                    disabled={!isStudent}
                                />
                                </div>
                            </CardContent>
                        </Card>
                        <Button 
                            type="submit" 
                            className="h-10 bg-[#1E4D36]  hover:bg-[#006937] transition-colors duration-200"
                        >
                            Sign Up
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}