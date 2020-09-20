import { Player } from './player';
import { makeStringify } from '../utils';
import { Match } from './match';

export enum ETeamSides {
	CT = 'CT',
	T = 'T',
}

export interface ITeamChange {
	name?: string;
	advantage?: number;
}

export class Team {
	match: Match;
	remoteId?: string;
	currentSide: ETeamSides; // TODO move to matchMap
	isTeamA: boolean;
	isTeamB: boolean;
	players: Set<Player> = new Set();
	name: string;
	advantage: number;

	constructor(
		match: Match,
		currentSide: ETeamSides,
		isTeamA: boolean,
		name: string,
		advantage: number = 0,
		remoteId?: string
	) {
		this.match = match;
		this.remoteId = remoteId;
		this.currentSide = currentSide;
		this.isTeamA = isTeamA;
		this.isTeamB = !isTeamA;
		this.name = name;
		this.advantage = advantage;
	}

	isPlayerInTeam(player: Player) {
		return this.players.has(player);
	}

	toJSON() {
		const obj = makeStringify(this);
		delete obj.match;
		return obj;
	}

	toIngameString(): string {
		return this.name.replace(/[";]/g, '');
	}

	change(change: ITeamChange) {
		if (change.name && change.name !== this.name) {
			this.name = change.name;
			this.match.setTeamNames();
		}

		if (typeof change.advantage === 'number') {
			this.advantage = change.advantage;
			if (this.match.isMatchEnd()) {
				this.match.onMapEnd();
			}
		}
	}
}
