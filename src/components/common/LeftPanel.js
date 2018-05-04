import React from 'react';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import './LeftPanel.css';

const LeftPanel = () => (
  <Paper className="LeftPanel-Background">
    <div style={{ margin: 20 }}>
      <Typography variant="display1" style={{ color: '#fff' }}>
        Life Chasing
      </Typography>
      <Typography style={{ color: '#fff' }}>
      This research is aimed at developing an age-friendly location-based game
      prototype – Life Chasing, the goal is promoting the health of the elderly.
      The interface design of the game follows the Universal Design and the
      design-for-elderly guidelines. Besides various incentive mechanisms within the game play,
      an experience evaluation module is developed in Life Chasing.
      Based on the principle of experience design, the game will collect all game- related data,
      including environmental data; physical information of player, etc.
      The evaluation module returns the analytical results (including the heartbeat analysis
      from the integrated wristband) to the player, who can setup the game that
      best meets the individuals personal needs.
      </Typography>
    </div>
  </Paper>
);

export default LeftPanel;
