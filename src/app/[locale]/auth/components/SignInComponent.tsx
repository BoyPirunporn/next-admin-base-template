import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormInputField } from '@/components/ui/form-input';
import { useActivityLog } from '@/hooks/use-activity-log';
import { useRouter } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import useStoreModal from '@/stores/store-model';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
const signInSchema = z.object({
    email: z.string().min(0).max(50),
    password: z.string().min(0).max(50)
});

type SignIn = z.infer<typeof signInSchema>;
const SignInComponent = ({
    active,
    handleToggle
}: Readonly<{
    active: boolean;
    handleToggle: () => void;
}>) => {
    const t = useTranslations();
    const locale = useLocale();
    const route = useRouter();


    const modal = useStoreModal();
    const form = useForm<SignIn>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const handleSubmit = async (data: SignIn) => {
        try {
            const response = await signIn("credentials", {
                redirect: false,
                ...data
            });
            if (response?.error) {
                modal.openModal({
                    title: "Invalid Credential!",
                    content: response.error
                });
            }
            if (response?.ok) {
                useActivityLog().log("SIGNIN", "CREDENTIAL", { from: "next-auth-provider" });
                window.location.replace("/"+locale)
            }
        } catch (error) {
            modal.openModal({
                title: "Exception",
                content: (error as Error).message
            });
        } finally {
            // logger.debug("SUBMIT END -> " + form.formState.isSubmitting);

        }
    };
    return (
        <div className={cn(
            "signin-container bg-primary",
            active && "signin-active "
        )}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="form-container">
                    <h1 className="text-xl font-bold">{t("auth.signTitle")}</h1>
                    <div className="my-5 flex gap-2">
                        {/* same icons */}
                    </div>
                    <div className="flex flex-col gap-3 w-full">
                        <FormInputField control={form.control} name={"email"} label={t("common.email")} />
                        <FormInputField control={form.control} name={"password"} type='password' label={t("common.password")} />
                        <a href="#" className="text-sm mt-2 text-center my-2 py-2">{t("auth.forgetYourPassword")}</a>
                        <Button progress={form.formState.isSubmitting} disabled={form.formState.isSubmitting}>
                            {t("auth.btnSignIn")}
                        </Button>
                    </div>
                    <p className='text-xs block md:hidden pt-3'>{t("auth.dontHaveAccount")} <span onClick={handleToggle} className='cursor-pointer text-primar underline'>SignUp</span>.</p>
                </form>
            </Form>
        </div>
    );
};

export default SignInComponent;