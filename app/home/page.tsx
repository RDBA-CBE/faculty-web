import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'FacultyPro – Academic Job Portal for Faculty Recruitment',
  description:
    'FacultyPro connects qualified educators with top colleges and universities across India. Browse faculty, professor, and academic job openings today.',
  keywords: [
    'faculty jobs',
    'professor jobs',
    'academic jobs India',
    'assistant professor vacancy',
    'college teaching jobs',
    'university jobs',
    'faculty recruitment India',
  ],
  alternates: {
    canonical: 'https://facultypro.in',
  },
  openGraph: {
    title: 'FacultyPro – Academic Job Portal for Faculty Recruitment',
    description:
      'Browse faculty and academic job openings at top colleges and universities across India.',
    url: 'https://facultypro.in',
    type: 'website',
    images: [
      {
        url: '/assets/images/footer_logo.png',
        width: 1200,
        height: 630,
        alt: 'FacultyPro',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FacultyPro – Academic Job Portal',
    description:
      'Find faculty and academic jobs at top colleges and universities across India.',
    images: ['/assets/images/footer_logo.png'],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
