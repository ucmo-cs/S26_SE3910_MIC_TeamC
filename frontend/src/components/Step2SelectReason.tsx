import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Typography,
    Box,
    Button,
    CircularProgress,
} from "@mui/material";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import type { SvgIconComponent } from "@mui/icons-material";

const ICON_MAP: Record<number, SvgIconComponent> = {
    1: AccountBalanceWalletOutlinedIcon,
    2: RequestQuoteOutlinedIcon,
    3: CreditCardOutlinedIcon,
    4: HelpOutlineOutlinedIcon,
    5: ReportProblemOutlinedIcon,
};

interface BranchTopic {
    id: number;
    topic: {
        id: number;
        name: string;
        description: string;
        icon: number;
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
    };

    return (
        <Card
        sx={{
            maxWidth: 760,
            margin: "0 auto",
            marginTop: 4,
            borderRadius: 4,
            border: "1px solid #d9e2ec",
            boxShadow: "0 12px 40px rgba(15, 23, 42, 0.08)",
            overflow: "hidden",
        }}
        >
        <CardHeader
        title={
            <Typography
            variant="h4"
            sx={{ fontWeight: 800, color: "#0f172a", mb: 1 }}
            >
            Step 2: Select Appointment Reason
            </Typography>
        }
        subheader={
            <Typography sx={{ color: "#64748b", fontSize: "1rem" }}>
            Choose the reason for your appointment to continue the scheduling process.
            </Typography>
        }
        sx={{ pb: 0, pt: 4, px: { xs: 3, sm: 4 } }}
        />

        <CardContent sx={{ px: { xs: 2, sm: 3 }, pb: 4 }}>
        {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
            </Box>
        ) : error ? (
            <Typography color="error" sx={{ px: 1 }}>{error}</Typography>
        ) : (
            <List sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
            {branchTopics.map((bt) => {
                const isSelected = value === bt.id;
                const IconComponent = ICON_MAP[bt.topic.icon];

                return (
                    <ListItem key={bt.id} disablePadding>
                    <ListItemButton
                    onClick={() => handleSelectReason(bt)}
                    selected={isSelected}
                    sx={{
                        border: "1px solid #d9e2ec",
                        borderRadius: 3,
                        px: 2.5,
                        py: 2,
                        alignItems: "flex-start",
                        transition: "all 0.25s ease",
                        backgroundColor: isSelected ? "#f8fbff" : "#ffffff",
                        "&.Mui-selected": {
                            backgroundColor: "#f8fbff",
                            borderColor: "#1565c0",
                            boxShadow: "0 0 0 2px rgba(21, 101, 192, 0.12)",
                        },
                        "&.Mui-selected:hover": {
                            backgroundColor: "#f8fbff",
                        },
                        "&:hover": {
                            backgroundColor: "#f8fbff",
                            borderColor: "#1565c0",
                            transform: "translateY(-2px)",
                        },
                    }}
                    >
                    {IconComponent && (
                        <Box
                        sx={{
                            minWidth: 44,
                            height: 44,
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: isSelected ? "#e8f1fb" : "#f4f7fb",
                            color: "#1565c0",
                            mr: 2,
                            mt: 0.5,
                        }}
                        >
                        <IconComponent />
                        </Box>
                    )}

                    <ListItemText
                    primary={
                        <Typography
                        sx={{
                            fontWeight: 700,
                            fontSize: "1.08rem",
                            color: "#0f172a",
                            mb: 0.4,
                        }}
                        >
                        {bt.topic.name}
                        </Typography>
                    }
                    secondary={
                        bt.topic.description ? (
                            <Typography
                            sx={{
                                color: "#64748b",
                                fontSize: "0.95rem",
                                lineHeight: 1.5,
                            }}
                            >
                            {bt.topic.description}
                            </Typography>
                        ) : undefined
                    }
                    />
                    </ListItemButton>
                    </ListItem>
                );
            })}
            </List>
        )}

        <Box
        sx={{
            marginTop: 3,
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
        }}
        >
        <Button
        variant="outlined"
        onClick={onPrev}
        sx={{
            minWidth: 120,
            textTransform: "none",
            fontWeight: 700,
            borderRadius: 2.5,
        }}
        >
        Back
        </Button>

        <Button
        variant="contained"
        onClick={onNext}
        disabled={!value}
        sx={{
            textTransform: "none",
            fontWeight: 700,
            borderRadius: 2.5,
            px: 3,
        }}
        >
        Continue
        </Button>
        </Box>
        </CardContent>
        </Card>
    );
};
