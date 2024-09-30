// import { Component, OnInit } from '@angular/core';
// import { ApiService } from '../services/api.service';
// import { ToastController } from '@ionic/angular';

// @Component({
//   selector: 'app-home',
//   templateUrl: 'home.page.html',
//   styleUrls: ['home.page.scss'],
// })
// export class HomePage implements OnInit {
//   patients: any[] = [];
//   preAppointments: any[] = [];
  
//   appointmentDate!: string; // For the appointment date
//   appointmentNotes!: string; // For the appointment notes
//   selectedPatient!: number; // Selected patient ID
//   prescriptionFile!: File; // File for prescription

//   constructor(private apiService: ApiService, private toastController: ToastController) {} // Inject ToastController

//   ngOnInit() {
//     this.fetchPatients();
//     this.fetchPreAppointments();
//   }

//   fetchPatients() {
//     this.apiService.getAllPatients().subscribe({
//       next: (data) => {
//         console.log('Fetched patients:', data); // Log to inspect the structure
//         this.patients = data;
//       },
//       error: (error) => {
//         console.error('Error fetching patients:', error);
//       }
//     });
//   }
  
  
//   fetchPreAppointments() {
//     this.apiService.getAllPreAppointments().subscribe({
//       next: (data) => {
//         this.preAppointments = data;
//       },
//       error: (error) => {
//         console.error('Error fetching pre-appointments:', error);
//       }
//     });
//   }
  

//   onFileChange(event: any) {
//     const file = event.target.files[0];
//     if (file) {
//       this.prescriptionFile = file;
//     }
//   }

//   async createPreAppointment() {
//     const formData = new FormData();
//     formData.append('AppointmentDate', this.appointmentDate);
//     formData.append('AppointmentNotes', this.appointmentNotes);
//     formData.append('Patient_Id', this.selectedPatient.toString());
//     if (this.prescriptionFile) {
//       formData.append('PrescriptionFile', this.prescriptionFile);
//     }

//     this.apiService.createPreAppointment(formData).subscribe(
//       async response => {
//         console.log('Pre-appointment created:', response);
//         // Display success message
//         await this.presentToast('Pre-appointment created successfully!', 'success');
//         // Optionally, refresh the list of pre-appointments after creation
//         this.fetchPreAppointments();
//       },
//       async error => {
//         console.error('Error creating pre-appointment:', error);
//         // Display error message
//         await this.presentToast('Failed to create pre-appointment. Please try again.', 'danger');
//       }
//     );
//   }

//   // Function to show toast messages
//   async presentToast(message: string, color: string) {
//     const toast = await this.toastController.create({
//       message: message,
//       duration: 2000, // Duration in milliseconds
//       color: color,
//       position: 'top', // Change position if needed (top, bottom, middle)
//     });
//     await toast.present();
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  patients: any[] = [];
  filteredPatients: any[] = []; // Array to hold filtered patients
  
  appointmentDate!: string; // For the appointment date
  appointmentNotes!: string; // For the appointment notes
  selectedPatient!: number; // Selected patient ID
  prescriptionFile!: File; // File for prescription
  searchTerm: string = ''; // Search term for filtering patients

  constructor(private apiService: ApiService, private toastController: ToastController) {}

  ngOnInit() {
    this.fetchPatients();
  }

  fetchPatients() {
    this.apiService.getAllPatients().subscribe({
      next: (data) => {
        console.log('Fetched patients:', data);
        this.patients = data;
        this.filteredPatients = data; // Initialize filteredPatients with all patients
      },
      error: (error) => {
        console.error('Error fetching patients:', error);
      }
    });
  }

  filterPatients() {
    const searchTermLower = this.searchTerm.toLowerCase();
    console.log('Searching for:', searchTermLower);

    this.filteredPatients = this.patients.filter(patient => {
      const matchesFirstName = patient.firstName.toLowerCase().includes(searchTermLower);
      const matchesLastName = patient.lastName.toLowerCase().includes(searchTermLower);
      const matchesEmail = patient.email.toLowerCase().includes(searchTermLower);
      return matchesFirstName || matchesLastName || matchesEmail;
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.prescriptionFile = file;
    }
  }

  async createPreAppointment() {
    const formData = new FormData();
    formData.append('AppointmentDate', this.appointmentDate);
    formData.append('AppointmentNotes', this.appointmentNotes);
    formData.append('Patient_Id', this.selectedPatient.toString());
    if (this.prescriptionFile) {
      formData.append('PrescriptionFile', this.prescriptionFile);
    }

    this.apiService.createPreAppointment(formData).subscribe(
      async response => {
        console.log('Pre-appointment created:', response);
        await this.presentToast('Pre-appointment created successfully!', 'success');
      },
      async error => {
        console.error('Error creating pre-appointment:', error);
        await this.presentToast('Failed to create pre-appointment. Please try again.', 'danger');
      }
    );
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top',
    });
    await toast.present();
  }
}

