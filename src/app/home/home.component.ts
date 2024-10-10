import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule ,NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from 'emailjs-com';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule,ReactiveFormsModule], // Import FormsModule here
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'] // Corrected property name
})
export class HomeComponent {

  contactForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  sendEmail(event: Event) {
    event.preventDefault();

    if (this.contactForm.invalid) {
      return; // Prevent sending if the form is invalid
    }

    emailjs.init('peVrOIyuf00zS4zA3'); // Replace with your EmailJS public key

    const { username, email, industryName, message } = this.contactForm.value;

    emailjs.send('service_ugwmlfd', 'template_th1vf2c', {
      from_name: username,
      email_id: email,
      industry_name: industryName,
      message: message
    }).then((response) => {
      console.log("Email sent successfully:", response);
      alert("Your message has been sent successfully!");
      this.resetForm();
    }).catch((error) => {
      console.error("Email sending failed:", error);
      alert("Oops! Something went wrong. Please try again later.");
    });
  }

  resetForm() {
    this.contactForm.reset();
  }

}
