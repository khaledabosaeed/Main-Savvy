export type Language = "en" | "ar"

export interface GalleryImage {
    id: string
    src: string
    alt: string
    // Grid span configuration (how many columns/rows the image should take)
    gridSpan?: {
        cols?: 1 | 2 // Number of columns (1 or 2)
        rows?: 1 | 2 // Number of rows (1 or 2)
    }
}

export const galleryContent = {
    en: {
        title: "Snapshots that tell our story.. Images that make the first impression",
        images: [
            {
                id: "img-1",
                src: "/home-page/gallery/image-1.jpg",
                alt: "Gallery Image 1",
                gridSpan: { cols: 1, rows: 1 }
            },
            {
                id: "img-2",
                src: "/home-page/gallery/image-2.jpg",
                alt: "Gallery Image 2",
                gridSpan: { cols: 1, rows: 1 }
            },
            {
                id: "img-3",
                src: "/home-page/gallery/image-3.jpg",
                alt: "Gallery Image 3",
                gridSpan: { cols: 2, rows: 1 }
            },
            {
                id: "img-4",
                src: "/home-page/gallery/image-4.jpg",
                alt: "Gallery Image 4",
                gridSpan: { cols: 1, rows: 1 }
            },
            {
                id: "img-5",
                src: "/home-page/gallery/image-5.jpg",
                alt: "Gallery Image 5",
                gridSpan: { cols: 1, rows: 2 }
            },
            {
                id: "img-6",
                src: "/home-page/gallery/image-6.jpg",
                alt: "Gallery Image 6",
                gridSpan: { cols: 1, rows: 1 }
            },
            {
                id: "img-7",
                src: "/home-page/gallery/image-7.jpg",
                alt: "Gallery Image 7",
                gridSpan: { cols: 1, rows: 1 }
            },
            {
                id: "img-8",
                src: "/home-page/gallery/image-8.jpg",
                alt: "Gallery Image 8",
                gridSpan: { cols: 2, rows: 1 }
            },
            {
                id: "img-9",
                src: "/home-page/gallery/image-9.jpg",
                alt: "Gallery Image 9",
                gridSpan: { cols: 1, rows: 1 }
            },
            {
                id: "img-10",
                src: "/home-page/gallery/image-10.jpg",
                alt: "Gallery Image 10",
                gridSpan: { cols: 1, rows: 1 }
            },
            {
                id: "img-11",
                src: "/home-page/gallery/image-11.png",
                alt: "Gallery Image 11",
                gridSpan: { cols: 1, rows: 1 }
            },
            {
                id: "img-12",
                src: "/home-page/gallery/image-12.png",
                alt: "Gallery Image 12",
                gridSpan: { cols: 1, rows: 1 }
            },
        ] as GalleryImage[],
    },
    ar: {
        title: "لقطات تحكي قصتنا.. وصور تصنع الانطباع الأول",
        images: [
            {
                id: "img-1",
                src: "/home-page/gallery/image-1.jpg",
                alt: "صورة المعرض 1",
                gridSpan: { cols: 1, rows: 1 }
            },
            {
                id: "img-2",
                src: "/home-page/gallery/image-2.jpg",
                alt: "صورة المعرض 2",
                gridSpan: { cols: 1, rows: 1 }
            },
            {
                id: "img-3",
                src: "/home-page/gallery/image-3.jpg",
                alt: "صورة المعرض 3",
                gridSpan: { cols: 2, rows: 1 }
            },
            {
                id: "img-4",
                src: "/home-page/gallery/image-4.jpg",
                alt: "صورة المعرض 4",
                gridSpan: { cols: 1, rows: 1 }
            },
            {
                id: "img-5",
                src: "/home-page/gallery/image-5.jpg",
                alt: "صورة المعرض 5",
                gridSpan: { cols: 1, rows: 2 }
            },
            {
                id: "img-6",
                src: "/home-page/gallery/image-6.jpg",
                alt: "صورة المعرض 6",
                gridSpan: { cols: 1, rows: 1 }
            },
            {
                id: "img-7",
                src: "/home-page/gallery/image-7.jpg",
                alt: "صورة المعرض 7",
                gridSpan: { cols: 1, rows: 1 }
            },
            {
                id: "img-8",
                src: "/home-page/gallery/image-8.jpg",
                alt: "صورة المعرض 8",
                gridSpan: { cols: 2, rows: 1 }
            },
            {
                id: "img-9",
                src: "/home-page/gallery/image-9.jpg",
                alt: "صورة المعرض 9",
                gridSpan: { cols: 1, rows: 1 }
            },
            {
                id: "img-10",
                src: "/home-page/gallery/image-10.jpg",
                alt: "صورة المعرض 10",
                gridSpan: { cols: 1, rows: 1 }
            },
            {
                id: "img-11",
                src: "/home-page/gallery/image-11.png",
                alt: "صورة المعرض 11",
                gridSpan: { cols: 1, rows: 1 }
            },
            {
                id: "img-12",
                src: "/home-page/gallery/image-12.png",
                alt: "صورة المعرض 12",
                gridSpan: { cols: 1, rows: 1 }
            },
        ] as GalleryImage[],
    },
}

export function getGalleryContent(lang: Language) {
    return galleryContent[lang] || galleryContent.en
}
