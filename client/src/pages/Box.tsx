import { Button } from "@/components/ui/button";

export const Box = (): JSX.Element => {
  return (
    <section
      aria-label="Scroll indicator"
      className="flex min-h-screen w-full items-center justify-center bg-white"
      data-id="scroll-indicator"
    >
      <Button
        type="button"
        variant="ghost"
        className="flex h-auto w-fit flex-col items-center gap-0 rounded-none p-0 hover:bg-transparent"
        data-testid="button-scroll"
      >
        <span className="flex min-h-[37px] items-center justify-center [font-family:'Baloo_Bhai-Regular',Helvetica] text-[27px] font-normal leading-[normal] tracking-[0] text-[#5d5757]">
          scroll
        </span>
        <img
          className="h-6 w-6"
          alt="Duotone chevron down"
          src="/figmaAssets/duotone---chevron-down.svg"
        />
      </Button>
    </section>
  );
};
