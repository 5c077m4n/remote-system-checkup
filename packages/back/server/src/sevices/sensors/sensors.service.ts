import { Injectable, OnModuleInit } from '@nestjs/common';
import * as si from 'systeminformation';

@Injectable()
export class SensorsService implements OnModuleInit {
	private staticData: si.Systeminformation.StaticData;
	async onModuleInit(): Promise<void> {
		this.staticData = await si.getStaticData();
	}

	public getTime(): si.Systeminformation.TimeData {
		return si.time();
	}
	public getSystem(): Promise<si.Systeminformation.SystemData> {
		return si.system();
	}
	public getBios(): Promise<si.Systeminformation.BiosData> {
		return si.bios();
	}
	public getBaseboard(): Promise<si.Systeminformation.BaseboardData> {
		return si.baseboard();
	}
	public getChassis(): Promise<si.Systeminformation.ChassisData> {
		return si.chassis();
	}
	public getCpu(): Promise<si.Systeminformation.CpuData> {
		return si.cpu();
	}
	public getCpuFlags(): Promise<string> {
		return si.cpuFlags();
	}
	public getCpuCache(): Promise<si.Systeminformation.CpuCacheData> {
		return si.cpuCache();
	}
	public getCpuCurrentspeed(): Promise<
		si.Systeminformation.CpuCurrentSpeedData
	> {
		return si.cpuCurrentspeed();
	}
	public getCpuTemperature(): Promise<
		si.Systeminformation.CpuTemperatureData
	> {
		return si.cpuTemperature();
	}
	public getMem(): Promise<si.Systeminformation.MemData> {
		return si.mem();
	}
	public getMemLayout(): Promise<si.Systeminformation.MemLayoutData[]> {
		return si.memLayout();
	}
	public getBattery(): Promise<si.Systeminformation.BatteryData> {
		return si.battery();
	}
	public getGraphics(): Promise<si.Systeminformation.GraphicsData> {
		return si.graphics();
	}
	public getOsInfo(): Promise<si.Systeminformation.OsData> {
		return si.osInfo();
	}
	public getUuid(): Promise<si.Systeminformation.UuidData> {
		return si.uuid();
	}
	public getVersions(): Promise<si.Systeminformation.VersionData> {
		return si.versions();
	}
	public getShell(): Promise<string> {
		return si.shell();
	}
	public getUsers(): Promise<si.Systeminformation.UserData[]> {
		return si.users();
	}
	public getCurrentLoad(): Promise<si.Systeminformation.CurrentLoadData> {
		return si.currentLoad();
	}
	public getFullLoac(): Promise<number> {
		return si.fullLoad();
	}
	public getProcesses(): Promise<si.Systeminformation.ProcessesData> {
		return si.processes();
	}
	public getServices(
		matcher: string,
	): Promise<si.Systeminformation.ServicesData[]> {
		return si.services(matcher);
	}
}
