import RobotPageBuilder from "@/components/admin/RobotPageBuilder"
import { createDefaultSection } from "@/lib/robot-section-defaults"

export default function AdminNewRobotPage() {
  const initialEn = [
    createDefaultSection("catalogCard"),
    createDefaultSection("hero"),
  ]
  const initialAr = [
    createDefaultSection("catalogCard"),
    createDefaultSection("hero"),
  ]
  return (
    <RobotPageBuilder
      mode="create"
      initialEn={initialEn}
      initialAr={initialAr}
    />
  )
}
