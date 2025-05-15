"use client";

import { Tab, Tabs } from "@heroui/react";
import { useState } from "react";

import CreateAccountForm from "../form/CreateAccountForm";
import StepHeader from "../ui/StepHeader";

const CreateAccount = () => {
  const [selectedTab, setSelectedTab] = useState<string>("password");

  return (
    <>
      <StepHeader
        description="In 3 Schritten zum kostenlosen Testaccount"
        title="Account erstellen"
      />
      <Tabs
        fullWidth
        radius="none"
        onSelectionChange={(key) => setSelectedTab(key as string)}
      >
        <Tab key="password" title="Email & Passwort" />
        <Tab key="magic-link" title="Magic Link" />
      </Tabs>
      <CreateAccountForm selectedTab={selectedTab} />
    </>
  );
};

export default CreateAccount;
