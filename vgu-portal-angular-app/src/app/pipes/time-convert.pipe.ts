import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeConvert',
  standalone: true
})
export class TimeConvertPipe implements PipeTransform {

  transform(data: any): unknown {
    let date = data instanceof Date ? data : new Date(data);
    return date.toTimeString().split(' ')[0].split(':').slice(0, 2).join(':');
  }

}
