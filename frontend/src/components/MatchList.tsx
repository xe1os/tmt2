import { Component, For, Show } from 'solid-js';
import { getTotalNumberOfMaps, IMatch } from '../../../common';
import { t } from '../utils/locale';
import { Link } from 'solid-app-router';
import classes from './MatchList.module.scss';

export const MatchList: Component<{ matches: IMatch[] }> = (props) => {
	return (
		<>
			<table class={classes.table}>
				<thead>
					<tr>
						<th>{t('#')}</th>
						<th>{t('ID')}</th>
						<th>{t('Team A')}</th>
						<th>{t('Team B')}</th>
						<th>{t('Match State')}</th>
						<th>{t('Current Map')}</th>
						<th>{t('Map State')}</th>
						<th>{t('Map Score')}</th>
						<th>{t('Link')}</th>
					</tr>
				</thead>
				<tbody>
					<For each={props.matches}>
						{(match, i) => (
							<tr>
								<td>{i() + 1}</td>
								<td>{match.id}</td>
								<td>{match.teamA.name}</td>
								<td>{match.teamB.name}</td>
								<td>{match.state}</td>
								<td>
									<Show when={match.state === 'MATCH_MAP'}>
										{match.matchMaps[match.currentMap]?.name ?? ''}
										<Show when={getTotalNumberOfMaps(match.electionSteps) > 1}>
											{` (${match.currentMap + 1}/${getTotalNumberOfMaps(
												match.electionSteps
											)})`}
										</Show>
									</Show>
								</td>
								<td>{match.matchMaps[match.currentMap]?.state}</td>
								<td>
									{match.matchMaps[match.currentMap]?.score.teamA ?? 0}
									{' : '}
									{match.matchMaps[match.currentMap]?.score.teamB ?? 0}
								</td>
								<td>
									<Link href={`/matches/${match.id}`}>{t('Open')}</Link>
								</td>
							</tr>
						)}
					</For>
				</tbody>
			</table>
		</>
	);
};
