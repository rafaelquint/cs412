import { Component } from '@angular/core';
import { SearchPlayer} from '../data/SearcchPlayer';
import { cesp} from '../data/cespPs6';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cs411-ps6';
  cesp: SearchPlayer[] = cesp;

  cespFunction() {
    var currText = document.getElementById("printable");
    currText.innerHTML = cesp[0].queryResults.row.name_display_first_last;
  }
}
