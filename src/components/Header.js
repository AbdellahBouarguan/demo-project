import Link from "next/link";
import SignOut from "./SignOut";

export default function Header(props) {
  return (
    <header className="backdrop-blur-sm text-bTwo py-4 px-8 flex flex-row gap-2">
      <h1 className="text-2xl font-bold 2xl:basis-10/12 lg:basis-5/6 md:basis-3/4 min-[375px]:basis-1/2">
        We-Tech
      </h1>
      {props.data && (
        <div className="flex flex-row 2xl:basis-2/12 lg:basis-1/6 md:basis-1/4 min-[375px]:basis-1/2  gap-2">
          <p className="self-center">
            <Link href="/User">{props.data.displayName}</Link>
          </p>
          <SignOut />
        </div>
      )}
    </header>
  );
}
