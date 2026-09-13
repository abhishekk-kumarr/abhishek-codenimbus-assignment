import { Wish, ScheduleDay, StoryEvent } from '../types';

export const weddingData = {
  hero: {
    groom_name: 'Aryan kapoor',
    bride_name: 'Alia Nair',
    wedding_date: '2026-10-31T10:45:00',
    display_date_text: 'Oct 30 & 31, 2026',
    main_location_name: 'Hall Complex',
    venue_link:
      'https://maps.google.com/?cid=3260281787863214776&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYASAA&hl=en-US&source=apiv3',
    contact: '+91 6364469555',
  },
  couple: {
    bride: {
      name: 'Alia Nair',
      parents: 'D/o Mr. Suresh Nair & Mrs. Lakshmi Nair',
      bio: 'A free spirit wrapped in grace, Alia moves through life with quiet confidence, an infectious laugh, and a kindness that makes everyone around her feel at home.',
      photo: '/bride.jpg',
    },
    groom: {
      name: 'Aryan kapoor',
      parents: 'S/o Mr. Rajesh Kapoor & Mrs. Meena Kapoor',
      bio: "A gentle soul with a poet's heart and an architect's mind, Aryan finds beauty in the details, whether in the curve of a building or the warmth of a quiet afternoon.",
      photo: '/groom.jpg',
    },
  },
  schedule: [
    {
      sectionTitle: 'Day1',
      date: '2026-10-30',
      displayDate: '30 October 2026',
      locationAddress: 'Hall Complex',
      mapLocation:
        'https://maps.google.com/?cid=3260281787863214776&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYASAA&hl=en-US&source=apiv3',
      image: '/assets/wed010/92b8184a-06a9-4c6f-bbb8-16e743d92b56_image.webp',
      events: [
        {
          eventName: 'Haldi',
          eventTime: '7:30 pm',
        },
        {
          eventName: 'Dinner',
          eventTime: '9:00 pm',
        },
      ],
    },
  ] as ScheduleDay[],
  initialWishes: [
    {
      id: '1',
      name: 'Rahul',
      message:
        'May your marriage be filled with endless love, shared dreams, warm laughter, and beautiful adventures. Wishing you both a wonderful life together, surrounded by happiness, peace, and love.',
    },
    {
      id: '2',
      name: 'Priya',
      message:
        'Congratulations on finding your forever! May your marriage be filled with love that grows stronger each day, laughter that never fades, dreams that come true, and memories you will cherish forever.',
    },
    {
      id: '3',
      name: 'Sanjay',
      message:
        'Wishing you both a lifetime filled with love, laughter, and countless beautiful moments together.',
    },
  ] as Wish[],
  story: [
    {
      year: '2021',
      title: 'first meet',
      date: '21 july , 2021',
      description:
        'As the evening breeze carried laughter through the garden, Aryan gathered the courage to tell Alia how he felt. Her smile said everything, and that magical moment became the start of forever.',
      image: '/love_story.jpg',
    },
  ] as StoryEvent[],
  family: {
    bride: {
      photo: '/bride_family.jpg',
      label: 'Bride',
    },
    groom: {
      photo: '/groom_family.jpg',
      label: 'Groom',
    },
  },
  audioUrl: '/assets/wed010/wedding_music.mp3',
  assets: {
    heroTopDecoration: '/assets/wed010/7b0e75d5-7e29-4aab-9bf5-53d1be4600e3_herotopdecoration.svg',
    heroDesign: '/assets/wed010/a3707dfd-70e7-47df-ac2b-c0121ce5afe1_herodesign.svg',
    mandap: '/assets/wed010/6f720a34-59ca-4796-860a-260ff7a8f557_image.webp',
    heroBottomDesign: '/assets/wed010/1dc97afe-a26e-4a90-82ad-d24a68a0c56d_herobottomdesign.svg',
    aboutDesign: '/assets/wed010/6a324c8c-c09a-4851-8cf6-beb2250f1f02_aboutdesign.svg',
    flowerTopLeft: '/assets/wed010/6c8c332b-18f2-44d4-befe-272cdb878bc3_image.webp',
    flowerTopRight: '/assets/wed010/de783c48-4888-4c49-96da-f17e24e7b959_image.webp',
    flowerBottomLeft: '/assets/wed010/2171c828-f2db-4127-927d-3af0f0b742a8_image.webp',
    flowerBottomRight: '/assets/wed010/aebf74a3-ccb0-4023-8429-fa21f078589d_image.webp',
    schedulePhoto: '/assets/wed010/92b8184a-06a9-4c6f-bbb8-16e743d92b56_image.webp',
  },
};
