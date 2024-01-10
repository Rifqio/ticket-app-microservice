import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/slices";
import AuthSchema from "@/lib/schema/AuthSchema";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components";
import { Register } from "@/routes/constants";

function Login() {
    const { login, error, success, cleanupSuccess } = useAuthStore(
        (state) => state
    );

    const navigate = useNavigate();

    const form = useForm<z.infer<typeof AuthSchema.Signin>>({
        resolver: zodResolver(AuthSchema.Signin),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const authGoogleUrl = "http://localhost:4000/api/users/signin/google";

    const handleSubmit = async (values: z.infer<typeof AuthSchema.Signin>) => {
        const { email, password } = values;
        console.log(email, password);
        // await login(email, password);
    };

    useEffect(() => {
        if (success) {
            navigate("/");
        }

        return () => {
            cleanupSuccess();
        };
    }, [success, navigate]);

    const LoginForm = () => {
        return (
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-8 items-center justify-center flex flex-col w-1/2"
                >
                    <h1 className="text-xl font-bold">Signin to continue</h1>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="w-96">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        id="email"
                                        placeholder="email@mail.com"
                                        type="email"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem className="w-96">
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        id="password"
                                        placeholder="******"
                                        type="password"
                                    />
                                </FormControl>
                                <FormDescription>
                                    Don't have an account?{" "}
                                    <Link
                                        className="cursor-pointer font-semibold"
                                        to={Register}
                                    >
                                        Register
                                    </Link>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="w-96">Signin</Button>
                    <Button variant="outline" asChild>
                        <Link to={authGoogleUrl} className="w-96 flex gap-4">
                            <img
                                className="w-6 h-6"
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                            />
                            <span>Continue with Google</span>
                        </Link>
                    </Button>
                </form>
            </Form>
        );
    };

    return (
        <div className="flex font-poppins h-screen overflow-hidden">
            <div className="bg-blue-700 w-1/2 rounded-tr-md rounded-br-md">
                <h1 className="font-semibold text-white text-xl mt-8 ml-8">
                    Ticket Inc
                </h1>
                <div className="flex flex-col items-center justify-center mt-32">
                    <h1 className="text-white text-3xl font-semibold">
                        Welcome Back
                    </h1>
                    <p className="text-white text-sm mt-4">
                        Sign in to continue
                    </p>
                    <div className="flex items-center justify-center mt-8">
                        <div className="flex items-center justify-center space-x-4">
                            <div className="w-4 h-4 bg-white rounded-full"></div>
                            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
            {LoginForm()}
        </div>
    );
}

export default Login;
