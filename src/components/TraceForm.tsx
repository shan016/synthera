"use client"

import { z } from "zod"
import FormField from "./FormField"
import { Form } from "./ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Button } from "./ui/button"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "./ui/card"

export const TraceForm = ({ credits }: { credits: number; }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<null | records | false>(null);
  const [balance, setBalance] = useState<number | null>(null);

  const formSchema = z.object({
    nric: z.string().min(5, {
      message: 'Sila masukkan nombor NRIC yang sah.'
    })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nric: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    setData(null)

    try {
      const formData = new FormData()
      formData.append('nric', values.nric.replaceAll('-', ''))

      const response = await fetch('/api/trace', {
        method: 'POST',
        body: formData
      })

      const responseData = await response.json()

      if (!response.ok || responseData.success === false) {
        toast.error(responseData.message || 'Gagal untuk menjejak NRIC.')
        setData(false)
        return
      }

      setData(responseData)
      setBalance(responseData?.balance)
      toast.success(`Success`)

    } catch (error) {
      toast.error('Error!')
      setData(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container p-4 mx-auto max-w-2xl">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Trace IC</CardTitle>
          <CardDescription>Semak identiti dan rekod pekerjaan</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                type="text"
                label="Nombor NRIC"
                placeholder="981230-04-1234"
                name="nric"
                control={form.control}
              />
              <div className="flex justify-between items-center space-x-5">
                <span className="text-sm text-muted-foreground">
                  Baki Kredit: {balance ? balance : credits}
                </span>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Loading...' : 'Lookup'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {data && (
        <Card className="p-4 mb-4 border-primary border">
          <CardHeader>
            <CardTitle>Info {data?.name}</CardTitle>
            <CardDescription>{data?.nric}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <ul className="space-y-1">
              <li><strong>Nama Penuh:</strong> {data.name}</li>
              <li><strong>NRIC:</strong> {data.nric}</li>
              {data.serviceNo && <li><strong>No. Perkhidmatan:</strong> {data.serviceNo}</li>}
              <li><strong>Tarikh Lahir:</strong> {data.dob}</li>
              <li><strong>Jantina:</strong> {data.sex === 'male' ? 'Lelaki' : 'Perempuan'}</li>
              <li><strong>Lokasi:</strong> {data.location}</li>
            </ul>

            {data.history && data.history.length > 0 && (
              <>
                <h4 className="text-base mt-4 font-semibold">Rekod Pekerjaan:</h4>
                <div className="space-y-4">
                  {data.history.map((x, index) => (
                    <div key={index} className="border-l-4 pl-4 border-accent-foreground">
                      <ul className="text-sm space-y-1">
                        <li><strong>Majikan:</strong> {x.employer}</li>
                        <li><strong>Industri:</strong> {x.industry}</li>
                        <li><strong>Alamat:</strong> {x.address}</li>
                        <li><strong>Tarikh Mula:</strong> {x.startDate}</li>
                      </ul>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}

      {data === false && (
        <p className="text-red-500 text-center mt-4 font-semibold">
          ❌ Tiada keputusan jejak untuk IC yang diberikan.
        </p>
      )}
    </div>
  )
}
