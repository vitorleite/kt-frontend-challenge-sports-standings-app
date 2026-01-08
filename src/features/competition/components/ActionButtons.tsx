import { Button, Row, Column } from '@/components/ui';
import { useState, type SVGProps } from 'react';
import { Competition } from '..';

export function ActionButtons() {
  const [showParticipantForm, setShowParticipantForm] = useState(false);
  const [showResultForm, setShowResultForm] = useState(false);

  const toggleParticipantForm = () => {
    setShowResultForm(false);
    setShowParticipantForm((prev) => !prev);
  };

  const toggleResultForm = () => {
    setShowParticipantForm(false);
    setShowResultForm((prev) => !prev);
  };

  return (
    <>
      <Row gap="space-between">
        <Button onClick={toggleParticipantForm}>
          {!showParticipantForm && <ExpandIcon />}
          {showParticipantForm && <CollapseIcon />}
          Add Participant
        </Button>
        <Button onClick={toggleResultForm}>
          {!showResultForm && <ExpandIcon />}
          {showResultForm && <CollapseIcon />}
          Add Score
        </Button>
      </Row>
      {(showParticipantForm || showResultForm) && (
        <Column>
          {showParticipantForm && <Competition.AddParticipantForm />}
          {showResultForm && <Competition.AddResultForm />}
        </Column>
      )}
    </>
  );
}

export function ExpandIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      {/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}
      <path fill="currentColor" d="M11 21v-8H3v-2h8V3h2v8h8v2h-8v8z" />
    </svg>
  );
}

export function CollapseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      {/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}
      <path fill="currentColor" d="M5 13v-2h14v2z" />
    </svg>
  );
}
