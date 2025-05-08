import { Component, input } from '@angular/core';

@Component({
  selector: 'app-avatar-group',
  standalone: true,
  imports: [],
  templateUrl: './avatar-group.component.html',
  styleUrl: './avatar-group.component.scss',
})
export class AvatarGroupComponent {
  item = input<any>();
  avatarClassList = input<string>();
}
