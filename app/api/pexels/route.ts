import { NextResponse } from 'next/server';

// Tu API Key de Pexels - Obtén una gratis en https://www.pexels.com/api/
const PEXELS_API_KEY = process.env.PEXELS_API_KEY || '';

interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  alt: string;
}

interface PexelsResponse {
  photos: PexelsPhoto[];
  page: number;
  per_page: number;
  total_results: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || 'waiter event';
  const perPage = searchParams.get('per_page') || '10';

  if (!PEXELS_API_KEY) {
    // Si no hay API key, devolver URLs de imágenes placeholder
    const placeholderImages = [
      {
        id: 1,
        src: { large: 'https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg?auto=compress&cs=tinysrgb&w=800' },
        photographer: 'Pexels',
        photographer_url: 'https://www.pexels.com',
        alt: 'Evento elegante'
      },
      {
        id: 2,
        src: { large: 'https://images.pexels.com/photos/2788792/pexels-photo-2788792.jpeg?auto=compress&cs=tinysrgb&w=800' },
        photographer: 'Pexels',
        photographer_url: 'https://www.pexels.com',
        alt: 'Boda elegante'
      },
      {
        id: 3,
        src: { large: 'https://images.pexels.com/photos/1579739/pexels-photo-1579739.jpeg?auto=compress&cs=tinysrgb&w=800' },
        photographer: 'Pexels',
        photographer_url: 'https://www.pexels.com',
        alt: 'Servicio de catering'
      },
      {
        id: 4,
        src: { large: 'https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=800' },
        photographer: 'Pexels',
        photographer_url: 'https://www.pexels.com',
        alt: 'Evento corporativo'
      },
      {
        id: 5,
        src: { large: 'https://images.pexels.com/photos/1045541/pexels-photo-1045541.jpeg?auto=compress&cs=tinysrgb&w=800' },
        photographer: 'Pexels',
        photographer_url: 'https://www.pexels.com',
        alt: 'Mesa elegante'
      },
      {
        id: 6,
        src: { large: 'https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&w=800' },
        photographer: 'Pexels',
        photographer_url: 'https://www.pexels.com',
        alt: 'Servicio de bar'
      },
      {
        id: 7,
        src: { large: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800' },
        photographer: 'Pexels',
        photographer_url: 'https://www.pexels.com',
        alt: 'Celebración'
      },
      {
        id: 8,
        src: { large: 'https://images.pexels.com/photos/1114425/pexels-photo-1114425.jpeg?auto=compress&cs=tinysrgb&w=800' },
        photographer: 'Pexels',
        photographer_url: 'https://www.pexels.com',
        alt: 'Banquete'
      },
    ];

    return NextResponse.json({ photos: placeholderImages });
  }

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Pexels');
    }

    const data: PexelsResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Pexels API error:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}

