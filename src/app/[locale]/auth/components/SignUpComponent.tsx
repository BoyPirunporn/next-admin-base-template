import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormInputField } from '@/components/ui/form-input';
import { cn } from '@/lib/utils';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import SocialComponent from './SocialComponent';
const signUpSchema = z.object({
    firstName: z.string().min(0).max(50),
    lastName: z.string().min(0).max(50),
    email: z.string().min(1).max(50),
    password: z.string().min(1).max(50)
});

type SignUp = z.infer<typeof signUpSchema>;

const SignUpComponent = ({
    active,
    handleToggle
}: Readonly<{
    active: Boolean;
    handleToggle: () => void;
}>) => {
    const form = useForm<SignUp>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }
    });
    return (
        <div className={cn(
            "signup-container",
            active && "signup-active"
        )}>
            <Form {...form}>
                <form className="form-container">
                    <h1 className="text-xl font-bold">Create Account</h1>
                    <div className='flex flex-col gap-3 w-full'>
                         <FormInputField control={form.control} name={"firstName"} label={'First Name'}/>
                         <FormInputField control={form.control} name={"lastName"} label={'Last Name'}/>
                         <FormInputField control={form.control} name={"email"} label={'Email'}/>
                         <FormInputField control={form.control} type='password' name={"password"} label={'Password'}/>
                        <SocialComponent/>
                        <Button>Sign Up</Button>
                    </div>
                    <p className='text-xs block md:hidden pt-3'>You have already account? <span onClick={handleToggle} className='cursor-pointer'>SignIn</span>.</p>
                </form>
            </Form>
        </div>
    );
};

export default SignUpComponent;