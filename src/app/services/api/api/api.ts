export * from './authentication.service';
import { AuthenticationService } from './authentication.service';
export * from './files.service';
import { FilesService } from './files.service';
export * from './master.service';
import { MasterService } from './master.service';
export * from './role.service';
import { RoleService } from './role.service';
export * from './users.service';
import { UsersService } from './users.service';
export * from './vendor.service';
import { VendorService } from './vendor.service';
export * from './weatherForecast.service';
import { WeatherForecastService } from './weatherForecast.service';
export const APIS = [
  AuthenticationService,
  FilesService,
  MasterService,
  RoleService,
  UsersService,
  VendorService,
  WeatherForecastService,
];
