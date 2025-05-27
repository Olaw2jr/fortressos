import { Separator } from "@/components/ui/separator"
import { ClientOnly } from "@/components/client-only"
import { AppearanceForm } from "@/components/dashboard/appearance/appearance-form"

export default function SettingsAppearancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <Separator />
      <ClientOnly>
        <AppearanceForm />
      </ClientOnly>
    </div>
  )
}
