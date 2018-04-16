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
          Culpa aliqua non minim minim enim in ea ex ex veniam qui fugiat.
          Consequat officia tempor consectetur nulla do elit laboris. Irure
          ullamco irure esse excepteur irure reprehenderit aute ex. Lorem
          deserunt Lorem minim ullamco pariatur pariatur eiusmod occaecat do.
          Amet velit cillum culpa commodo sint. Veniam quis labore ea ut consectetur
          voluptate fugiat sint id officia incididunt. Ullamco laboris et nisi voluptate
          ex reprehenderit culpa aliquip ut cupidatat.
      </Typography>
    </div>
  </Paper>
);

export default LeftPanel;
