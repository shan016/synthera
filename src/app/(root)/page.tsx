import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link";
import { pricing, faq, HERO_SECTION, FEATURES_SECTION, HOW_SECTION, FOOTER, config } from "@/constants";

const Page = () => {
  const date = new Date();
  return (
    <>
      <section className="flex items-center justify-center py-20">
        <div className="flex flex-col px-7 gap-2 text-center">
          <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-5xl">
            {HERO_SECTION.title}
          </h1>
          <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
            {HERO_SECTION.description}
          </p>
          <div className="flex mt-6 gap-4 items-center justify-center">
            {HERO_SECTION.items?.map((x, idx) => (
              <Link href={x.href || '#'} key={idx}>
                {x.variant ? (
                  <Button variant={x.variant}>{x.label}</Button>
                ) : (
                  <Button>{x.label}</Button>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="flex flex-col justify-center items-center px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold">{FEATURES_SECTION.title}</h2>
          <p className="mt-2">{FEATURES_SECTION.description}</p>
        </div>

        <div className="grid gap-2 my-8 max-w-lg">
          {FEATURES_SECTION.items?.map((x, index) => (
            <div key={index}>
              <div className="p-6 border rounded-lg shadow mt-2 hover:shadow-md">
                <div className="flex gap-2">
                  <x.icon />
                  <h3 className="text-xl font-semibold">{x.title}</h3>
                </div>
                <p className="text-muted-foreground mt-2">{x.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="flex items-center justify-center">
        <div className="p-5 mx-4 max-w-lg">
          <h3 className="mb-2 text-3xl font-semibold">{HOW_SECTION.title}</h3>
          <p className="text-muted-foreground">
            {HOW_SECTION.description}
          </p>
          <ul className="max-w-md pt-3 list-disc list-inside">
            {HOW_SECTION.items?.map((x, index) => (
              <li key={index}>{x.label}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing */}
      {/* Pricing */}
      <section id="products" className="flex flex-col gap-4 items-center justify-center py-20">
        <div className="max-w-lg p-5 mx-4 text-center">
          <h1 className="text-3xl font-semibold">Pakej Harga</h1>
          <p className="text-muted-foreground mt-1">Pilih ikut keperluan anda.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {pricing.map((x, index) => (
            <Card key={index} className="m-2 hover:border-primary active:scale-95 transition shadow">
              <CardHeader>
                <CardTitle className="text-2xl">{x.title}</CardTitle>
                <CardDescription>{x.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex mb-5 items-end gap-2">
                  <h1 className="text-3xl">{x.price || 'Harga ikut permintaan'}</h1>
                </div>
                <ul className="space-y-1">
                  {x.details.map((item, idx) => (
                    <li key={idx} className="flex gap-2 items-start">
                      <Check className="mt-1 w-4 h-4 text-green-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/sign-in" className="w-full">
                  <Button className="w-full">
                    Log masuk untuk pilih
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section className="flex mx-auto justify-center items-center">
        <div className="p-5 mx-4">
          {faq.map((x, index) => (
            <Accordion type="single" collapsible key={index} className="max-w-lg">
              <AccordionItem value="item-1">
                <AccordionTrigger>{x.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {x.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </section>

      <footer className="flex mx-auto justify-center items-center text-sm">
        <div className="mx-auto py-4">
          <p>&copy; {date.getFullYear()} {config.title}. All right reserved.</p>
          <div className="flex gap-4 mt-2">
            <Link href="/terms" className="hover:underline">Terms & Conditions</Link>
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Page;