import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@/components/logo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import AuthTextInput from "@/components/auth/auth-text-input";
import ErrorMessage from "@/components/auth/error-msg";
import { Link } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import { useAuth } from "@/context/auth-provider";
import { RegisterSchema } from "@/schemas/auth-schema";
import SocialAuth from "@/components/auth/social";

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
  });
  const { register, loading } = useAuth();
  const toast = useToast();

  const handleRegister = async (data: z.infer<typeof RegisterSchema>) => {
    if (register) {
      toast.show("Start registering");
      await register(data);
    }
  };

  return (
    <SafeAreaView className="bg-dark h-full">
      <ScrollView className="w-full mt-[60px] px-[24px] ">
        <View className="flex flex-row  ">
          <Logo />
        </View>
        <Text className="mt-9 text-[22px] font-psemibold text-primary-300">
          Sign up
        </Text>
        {/** form */}
        <View className="mt-7 space-y-5 flex">
          {/** Email */}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <AuthTextInput
                  title="Email"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  placeholder="Your Email"
                  error={!!errors.email}
                />
                {errors.email && (
                  <View className="absolute top-[17px] right-1">
                    <ErrorMessage message={errors.email.message!} />
                  </View>
                )}
              </View>
            )}
            name="email"
          />

          {/** password */}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <AuthTextInput
                  title="Password"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  placeholder="*****"
                  fieldType="password"
                  error={!!errors.password}
                />
                {errors.password && (
                  <View className="absolute top-[17px]  right-1">
                    <ErrorMessage message={errors.password.message!} />
                  </View>
                )}
              </View>
            )}
            name="password"
          />

          {/** confirm Password */}
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <AuthTextInput
                  title="Confirm Password"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  placeholder="*****"
                  fieldType="password"
                  error={!!errors.confirmPassword}
                />
                {errors.confirmPassword && (
                  <View className="absolute top-[17px]  right-1">
                    <ErrorMessage message={errors.confirmPassword.message!} />
                  </View>
                )}
              </View>
            )}
            name="confirmPassword"
          />

          {/** submit form */}
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <TouchableOpacity
              className="rounded-xl text-center flex flex-row justify-center  bg-primary-300 p-4 mt-4"
              onPress={handleSubmit(handleRegister)}
            >
              <Text className="text-[19px] font-rubik text-white ">Login</Text>
            </TouchableOpacity>
          )}
        </View>

        <SocialAuth />

        {/** go to register */}
        <View className="flex flex-row items-center justify-center text-center mt-4">
          <Text className="text-secondary font-pregular">
            {"Already have an account?  "}
            <Link href={"/login"}>
              <Text className="text-primary-300">Login</Text>
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
