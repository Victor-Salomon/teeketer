import Link from "next/link";
import TernoaIcon from "@/assets/providers/Ternoa";
import UserConnection from "./UserConnection";

export const Header = () => {
  return (
    <nav className="container fixed top-0 left-0 right-0 backdrop-blur-md z-50">
      <div className="flex justify-between items-center py-4">
        <Link href="/" className="flex items-center">
          <TernoaIcon />
          <div className="px-2">
            <div className="text-xl font-bold">Teeketer</div>
            <div className="hidden sm:block font-light text-sm text-muted-foreground">
              Built with Keeper, powered by Ternoa.
            </div>
          </div>
        </Link>
        <UserConnection />
      </div>
    </nav>
  );
};
