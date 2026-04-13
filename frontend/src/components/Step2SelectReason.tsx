import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  CircularProgress,
  Typography,
  Box,
  Button,
} from "@mui/material";

interface BranchTopic {
  id: number;
  topic: {
    id: number;
    name: string;
  };
}

interface Step2Props {
  onNext: () => void;
  onPrev: () => void;
  onDataChange: (data: any) => void;
  branchId: number;
  value: number;
}

export const Step2SelectReason: React.FC<Step2Props> = ({
  onNext,
  onPrev,
  onDataChange,
  branchId,
  value,
}) => {
  const [branchTopics, setBranchTopics] = useState<BranchTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!branchId) return;

    setLoading(true);

    fetch(`http://localhost:8080/api/branches/${branchId}/branch-topics`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch appointment reasons");
      return res.json();
    })
    .then((data: BranchTopic[]) => setBranchTopics(data))
    .catch((err) => setError(err.message))
    .finally(() => setLoading(false));
  }, [branchId]);

  const handleSelectReason = (bt: BranchTopic) => {
    onDataChange({
      branchTopicId: bt.id,
      branchTopicName: bt.topic.name,
    });
    onNext();
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "0 auto", marginTop: 4 }}>
    <CardHeader title="Step 2: Select Appointment Reason" />
    <CardContent>
    {loading ? (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <CircularProgress />
      </Box>
    ) : error ? (
      <Typography color="error">{error}</Typography>
    ) : (
      <List>
      {branchTopics.map((bt) => (
        <ListItem key={bt.id} disablePadding>
        <ListItemButton
        onClick={() => handleSelectReason(bt)}
        selected={value === bt.id}
        >
        <ListItemText primary={bt.topic.name} />
        </ListItemButton>
        </ListItem>
      ))}
      </List>
    )}

    <Box
    sx={{
      marginTop: 3,
      display: "flex",
      gap: 2,
      justifyContent: "flex-end",
    }}
    >
    <Button variant="outlined" onClick={onPrev}>
    Back
    </Button>
    </Box>
    </CardContent>
    </Card>
  );
};
