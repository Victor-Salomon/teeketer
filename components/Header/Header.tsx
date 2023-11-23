import Link from "next/link";
import TernoaIcon from "@/assets/providers/Ternoa";
import { Button } from "@/components/ui/button";
import Image from "next/image";
// import Connection from "../../base/Modals/Connection";

const Header = () => {
  return (
    <nav className="container fixed top-0 left-0 right-0 backdrop-blur-md z-50">
      <div className="flex justify-between items-center py-4">
        <Link href="/" className="flex items-center">
          <TernoaIcon />
          <div className="px-2">
            <div className="text-xl font-bold">Avnoa</div>
            <div className="hidden sm:block font-light text-sm text-muted-foreground">
              Built with Keeper, powered by Ternoa.
            </div>
          </div>
        </Link>
        <Button variant={"outline"}>
          <Image
            src="/metamask.svg"
            alt="MetaMask Logo"
            className="dark:invert pe-1"
            width={30}
            height={30}
            priority
          />
          Connect
        </Button>
      </div>
    </nav>
  );
};

export default Header;
