// {
//   id: 2,
//   name: "Self-Improvement",
//   description: "Journals and note-taking",
//   imageSrc:
//     "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg",
//   imageAlt:
//     "Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.",
//   href: "#",
// },
// {
//   id: 3,
//   name: "Travel",
//   description: "Daily commute essentials",
//   imageSrc:
//     "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg",
//   imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
//   href: "#",
// },
// {
//   id: 4,
//   name: "Travel",
//   description: "Daily commute essentials",
//   imageSrc:
//     "https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg",
//   imageAlt: "Collection of four insulated travel bottles on wooden shelf.",
//   href: "#",
// },

projects
  ? [
      {
        id: projects[0]._id,
        name: projects[0].title,
        description: "Work from home accessories",
        imageSrc: projects[0].thumbnail,
        imageAlt:
          "Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.",
        href: "#",
      },
    ]
  : [];


// default, high, maxres, medium, standard