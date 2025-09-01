import EmailNotVerifyClient from "./client/EmailNotVerifyClient";

const EmailNotVerifyPage = async ({
  searchParams
}: {
  searchParams: Promise<{
    message: string;
  }>;
}) => {
  const { message } = await searchParams;
  return (
    <div className="flex m-auto justify-center items-center min-h-screen relative">
      <EmailNotVerifyClient message={message} />
    </div>
  );
};

export default EmailNotVerifyPage;