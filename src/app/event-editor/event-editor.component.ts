import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { EventService } from '../service/event.service';
import { Event } from 'src/app/model/event';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.scss']
})
export class EventEditorComponent implements OnInit {

  event: Event = new Event();
  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute
  ) {
    console.log('event-editor:event', this.event)
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.eventService.get(Number(params.id)).subscribe(
          event => {
            // console.log('event',event);
            this.event = event || new Event();
          }
        )
      }
    );
  }

  onFormSubmit(form: NgForm): void {
    console.log('form', form.value);
    form.value.location = { address: form.value.address, city: form.value.city, country: form.value.country };
    const currentEvent = { ...form.value };
    delete currentEvent.address;
    delete currentEvent.city;
    delete currentEvent.country;
    console.log('currentEvent', currentEvent);
    this.eventService.update(currentEvent);
  }

}
