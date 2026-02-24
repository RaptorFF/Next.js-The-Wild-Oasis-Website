import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest",
};

export default async function Account() {
  const session = await auth();
  const user = session.user.name;
  const firstName = user.split(" ")[0];
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Wellcome, {firstName}!
      </h2>
    </div>
  );
}
