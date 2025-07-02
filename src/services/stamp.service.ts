import { Injectable } from '@angular/core';

export interface PostalService {
  title: string;
  description: string;
  price: string;
}

@Injectable({
  providedIn: 'root'
})
export class StampService {
  private postalServices: PostalService[] = [
    {
      title: "1st Class Mail",
      description: "Next working day delivery including Saturdays.",
      price: "From £1.10"
    },
    {
      title: "2nd Class Mail",
      description: "Delivery in 2-3 working days including Saturdays.",
      price: "From £0.70"
    },
    {
      title: "Signed For",
      description: "Provides proof of delivery and additional security.",
      price: "+ £1.50"
    },
    {
      title: "Special Delivery Guaranteed by 9am",
      description: "Next day guaranteed delivery with tracking and compensation up to £1000.",
      price: "From £7.95"
    },
    {
      title: "Special Delivery Guaranteed by 1pm",
      description: "Next day guaranteed delivery with tracking and compensation up to £500.",
      price: "From £6.85"
    }
  ];

  constructor() { }

  getPostalServices(): PostalService[] {
    return this.postalServices;
  }

  calculateStamps(mailType: string, serviceType: string, weight: number): any {
    // Base prices (in pence)
    let basePrice = 0;
    
    // Calculate based on mail type
    if (mailType === 'letter') {
      if (weight <= 100) {
        basePrice = serviceType.includes('1st') ? 110 : 70;
      } else {
        // If over 100g, treat as large letter
        if (weight <= 250) {
          basePrice = serviceType.includes('1st') ? 160 : 110;
        } else if (weight <= 500) {
          basePrice = serviceType.includes('1st') ? 220 : 160;
        } else if (weight <= 750) {
          basePrice = serviceType.includes('1st') ? 330 : 220;
        } else {
          basePrice = serviceType.includes('1st') ? 400 : 300;
        }
      }
    } else if (mailType === 'large-letter') {
      if (weight <= 100) {
        basePrice = serviceType.includes('1st') ? 160 : 110;
      } else if (weight <= 250) {
        basePrice = serviceType.includes('1st') ? 220 : 160;
      } else if (weight <= 500) {
        basePrice = serviceType.includes('1st') ? 330 : 220;
      } else if (weight <= 750) {
        basePrice = serviceType.includes('1st') ? 400 : 300;
      } else {
        basePrice = serviceType.includes('1st') ? 550 : 450;
      }
    } else if (mailType === 'small-parcel') {
      basePrice = serviceType.includes('1st') ? 390 : 290;
    } else { // medium parcel
      basePrice = serviceType.includes('1st') ? 590 : 490;
    }
    
    // Add service extras
    if (serviceType === 'signed-for') {
      basePrice += 150;
    } else if (serviceType === 'special-9am') {
      basePrice += 795;
    } else if (serviceType === 'special-1pm') {
      basePrice += 685;
    }
    
    // Convert to pounds
    const totalCost = (basePrice / 100).toFixed(2);
    
    // Calculate number of stamps (simplified)
    let stampCount;
    if (basePrice <= 110) {
      stampCount = 1;
    } else if (basePrice <= 220) {
      stampCount = 2;
    } else {
      stampCount = Math.ceil(basePrice / 110);
    }
    
    // Generate stamp display
    const stamps = [];
    let remaining = basePrice;
    
    // Simplified stamp breakdown
    while (remaining > 0) {
      if (remaining >= 200) {
        stamps.push('£2');
        remaining -= 200;
      } else if (remaining >= 110) {
        stamps.push('1st');
        remaining -= 110;
      } else if (remaining >= 100) {
        stamps.push('£1');
        remaining -= 100;
      } else if (remaining >= 50) {
        stamps.push('50p');
        remaining -= 50;
      } else if (remaining >= 20) {
        stamps.push('20p');
        remaining -= 20;
      } else if (remaining >= 10) {
        stamps.push('10p');
        remaining -= 10;
      } else {
        stamps.push(Math.round(remaining) + 'p');
        remaining = 0;
      }
    }
    
    return {
      stampCount: stampCount,
      totalCost: '£' + totalCost,
      stamps: stamps
    };
  }
}