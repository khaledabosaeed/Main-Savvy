import type { RobotPageSectionData } from "@/lib/robots-custom-page"

export function createDefaultSection(
  type: RobotPageSectionData["type"]
): RobotPageSectionData {
  switch (type) {
    case "hero":
      return {
        type: "hero",
        videoSrc: "",
        posterImage: "",
        title: "",
        subtitle: "",
        textPlacement: "center",
        buttonText: "View Product",
        features: [],
      }
    case "product":
      return {
        type: "product",
        name: "",
        price: "",
        images: [],
        bulletPoints: [],
        versions: [{ id: "default", name: "Default" }],
      }
    case "specs":
      return {
        type: "specs",
        sections: [
          {
            header: "Overview",
            columns: ["Specification", "Value"],
            rows: [["", ""]],
          },
        ],
      }
    case "scrollVideo":
      return {
        type: "scrollVideo",
        items: [
          {
            videoSrc: "",
            title: "",
            subtitle: "",
          },
        ],
      }
    case "image":
      return {
        type: "image",
        title: "",
        images: [],
      }
    case "carousel":
      return {
        type: "carousel",
        title: "",
        subtitle: "",
        images: [],
        items: [{ header: "", subtext: "" }],
      }
    case "catalogCard":
      return {
        type: "catalogCard",
        name: "",
        description: "",
        image: "",
        buttonText: "Learn more",
        link: "",
        category: "industrial",
      }
    default: {
      const _exhaustive: never = type
      return _exhaustive
    }
  }
}
