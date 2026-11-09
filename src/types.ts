export type Language = 'en' | 'sw';

export type ServiceCategory = 'makeup' | 'hair' | 'nails' | 'skincare' | 'lashes_brows' | 'training' | 'bridal_package' | 'kids';

export interface Service {
  id: string;
  category: ServiceCategory;
  name: string;
  nameSw: string;
  durationMinutes: number;
  priceKES: number;
  depositKES: number;
  description: string;
  descriptionSw: string;
  image: string;
  includes: string[];
  includesSw: string[];
  aftercareTips: string[];
  aftercareTipsSw: string[];
  featured?: boolean;
}

export interface Stylist {
  id: string;
  name: string;
  title: string;
  titleSw: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  bio: string;
  bioSw: string;
  image: string;
  categories: ServiceCategory[];
  availableSlots: string[];
  instagram: string;
}

export interface Appointment {
  id: string;
  bookingRef: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  serviceId: string;
  serviceName: string;
  stylistId: string;
  stylistName: string;
  date: string;
  timeSlot: string;
  totalKES: number;
  depositPaidKES: number;
  paymentPreference?: 'deposit_now' | 'pay_at_parlour';
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  mpesaCode: string;
  notes?: string;
  createdAt: string;
  reminderSent: boolean;
}

export interface CommunityEvent {
  id: string;
  title: string;
  titleSw: string;
  date: string;
  time: string;
  location: string;
  priceKES: number;
  spotsLeft: number;
  image: string;
  description: string;
  descriptionSw: string;
  category: 'masterclass' | 'expo' | 'networking' | 'wellness';
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  date: string;
  rating: number;
  serviceCategory: ServiceCategory;
  serviceName: string;
  stylistName: string;
  text: string;
  verified: boolean;
}

export interface MembershipTier {
  id: string;
  name: string;
  perks: string[];
  discountPercent: number;
  minPoints: number;
  color: string;
}

export interface TikTokPost {
  id: string;
  handle: string;
  caption: string;
  views: string;
  likes: string;
  comments: string;
  shares: string;
  audioName: string;
  videoThumb: string;
  duration: string;
  tags: string[];
  serviceId: string;
  serviceName: string;
  tiktokUrl: string;
}
