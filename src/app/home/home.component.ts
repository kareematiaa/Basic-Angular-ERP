import { GeneralService } from './../general.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
} from '@angular/forms';
import { Order } from '../Order';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  // orderForm: FormGroup;
  customers: any[] = [];
  products: any[] = [];
  selectedCustomerId: number = 0;
  selectedProductId: number = 0;

  fullName: string = '';
  location: string = '';
  productName: string = '';
  productDescription: string = '';
  quantity: number = 0;
  price: number = 0;
  totalPrice: number = 0;
  orderPrice: number = 0;
  discount: number = 0;
  total: number = 0;
  discountAmount: number = 0;

  constructor(
    private fb: FormBuilder,
    private GeneralService: GeneralService
  ) {}

  order: Order = {
    customerId: 555,
    discount: this.discount,
    orderTotal: this.total,
    orderDetails: [
      {
        productId: this.selectedProductId,
        quantity: this.quantity,
        productPrice: this.price,
      },
    ],
  };

  calculateTotalPrice() {
    this.discountAmount = this.orderPrice * (this.discount / 100);
    this.total = this.orderPrice - this.discountAmount;
  }

  calculateResult() {
    this.totalPrice = this.price * this.quantity;
    this.orderPrice = this.totalPrice;
  }

  onCustomerSelect(customerId: number): void {
    if (customerId) {
      this.GeneralService.getCustomerById(customerId).subscribe((data) => {
        this.fullName = data.fUllName;
        this.location = data.location;
      });
    }
  }

  onProductSelect(productId: number): void {
    if (productId) {
      this.GeneralService.getProductById(productId).subscribe((data) => {
        this.productName = data.name;
        this.productDescription = data.description;
      });
    }

    console.log(this.fullName);
  }

  loadCustomers() {
    this.GeneralService.getAllCustomers().subscribe((data) => {
      this.customers = data;
    });
  }

  loadProducts() {
    this.GeneralService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  submitOrder() {
    this.order.customerId = this.selectedCustomerId;
    this.order.discount = this.discount;
    this.order.orderTotal = this.total;
    this.order.orderDetails = [
      {
        productId: this.selectedProductId,
        quantity: this.quantity,
        productPrice: this.price,
      },
    ];

    this.GeneralService.submitOrder(this.order).subscribe(
      (response) => {
        console.log('Order submitted successfully:', response);
      },
      (error) => {
        console.error('Error submitting order:', error);
      }
    );
  }

  ngOnInit(): void {
    this.loadCustomers();
    this.loadProducts();
  }
}
