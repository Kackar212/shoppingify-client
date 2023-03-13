import Image from "next/image";

export function CartButton() {
  return (
    <button>
      <Image
        src="assets/shopping-cart.svg"
        alt="Open items list"
        width={40}
        height={40}
      />
    </button>
  );
}
