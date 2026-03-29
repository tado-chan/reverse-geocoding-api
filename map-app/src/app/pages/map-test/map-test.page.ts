import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IonContent } from '@ionic/angular/standalone';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';
import { environment } from '../../../environments/environment';

const GEOCODING_ENDPOINT = 'https://geocode.googleapis.com/v4alpha/geocode/destinations';

interface DestinationsResponse {
  destinations?: Array<{
    primary?: {
      displayPolygon?: object;
    };
  }>;
}

@Component({
  selector: 'app-map-test',
  standalone: true,
  imports: [CommonModule, IonContent],
  templateUrl: './map-test.page.html',
  styleUrls: ['./map-test.page.scss'],
})
export class MapTestPage implements OnInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;

  private map!: google.maps.Map;
  private clickListener?: google.maps.MapsEventListener;

  constructor(private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    await this.initMap();
  }

  ngOnDestroy(): void {
    this.clickListener?.remove();
  }

  private async initMap(): Promise<void> {
    setOptions({ key: environment.googleMapsApiKey, v: 'weekly' });
    await importLibrary('maps');

    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: { lat: 35.6812, lng: 139.7671 },
      zoom: 17,
    });

    this.map.data.setStyle({
      fillColor: '#88d4fc',
      fillOpacity: 0.5,
      strokeColor: '#0085cc',
      strokeOpacity: 1,
      strokeWeight: 2,
    });

    this.clickListener = this.map.addListener(
      'click',
      (event: google.maps.MapMouseEvent) => {
        if (event.latLng) {
          this.onMapClick(event.latLng.lat(), event.latLng.lng());
        }
      }
    );
  }

  private onMapClick(latitude: number, longitude: number): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': environment.googleMapsApiKey,
      'X-Goog-FieldMask': 'destinations.primary.displayPolygon',
    });

    const body = {
      locationQuery: {
        location: { latitude, longitude },
        placeFilter: {
          structureType: 'BUILDING',
          addressability: 'ANY',
        },
      },
    };

    this.http
      .post<DestinationsResponse>(GEOCODING_ENDPOINT, body, { headers })
      .subscribe({
        next: (response) => {
          console.log('API レスポンス:', JSON.stringify(response, null, 2));
          this.map.data.forEach((feature: google.maps.Data.Feature) => this.map.data.remove(feature));

          const destinations = response?.destinations;
          if (!destinations || destinations.length === 0) {
            console.log('ポリゴンが取得できませんでした（destinations なし）');
            return;
          }

          const polygon = destinations[0]?.primary?.displayPolygon;
          if (!polygon) {
            console.log('ポリゴンが取得できませんでした（displayPolygon なし）');
            console.log('destinations[0]:', JSON.stringify(destinations[0], null, 2));
            return;
          }

          this.map.data.addGeoJson({
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: polygon,
                properties: {},
              },
            ],
          });
        },
        error: (err) => {
          console.log('Geocoding API エラー status:', err.status);
          console.log('Geocoding API エラー body:', JSON.stringify(err.error, null, 2));
        },
      });
  }
}
