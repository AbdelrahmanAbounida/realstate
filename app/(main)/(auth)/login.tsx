import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from "expo-router";
import Logo from "@/components/logo";
import { useAuth } from "@/context/auth-provider";
import AuthTextInput from "@/components/auth/auth-text-input";
import { LoginSchema } from "@/schemas/auth-schema";
import { toast } from "@/lib/toast";
import icons from "@/constants/icons";
import SocialAuth from "@/components/auth/social";

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });
  const { login, authError, loading } = useAuth();

  const handleLogin = async (data: z.infer<typeof LoginSchema>) => {
    if (!login) return;
    await login(data);
  };

  useEffect(() => {
    if (!authError) return;
    toast.error(authError.message);
  }, [authError]);

  return (
    <SafeAreaView className="bg-dark h-full">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="w-full mt-[60px] px-[24px] "
      >
        <Logo />
        <Text className="mt-9 text-[22px] font-psemibold text-primary-400 font-rubik">
          Login
        </Text>
        {/** form */}
        <View className="mt-7 space-y-3 flex">
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
                    <Text className="text-red-500  text-[11px]">
                      {errors.email.message}
                    </Text>
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
                    <Text className="text-red-500  text-[11px]">
                      {errors.password.message}
                    </Text>
                  </View>
                )}
              </View>
            )}
            name="password"
          />

          <View className="w-full  flex flex-row items-center justify-end px-2">
            <Link href={"/forget-password"} className="mt-2 text-primary-300 ">
              <Text className="text-secondary ">Forget Password?</Text>
            </Link>
          </View>

          {/** submit form */}
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <TouchableOpacity
              className="rounded-xl text-center flex flex-row justify-center  bg-primary-300 p-4 mt-4"
              onPress={handleSubmit(handleLogin)}
            >
              <Text className="text-[19px] font-rubik text-white ">Login</Text>
            </TouchableOpacity>
          )}
        </View>

        <SocialAuth />

        {/** go to register */}
        <View className="flex flex-row items-center justify-center text-center mt-4">
          <Text className="text-secondary font-pregular">
            {"Don’t have an account? "}
            <Link href={"/register"} className="">
              <Text className="text-primary-300">Signup</Text>
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
